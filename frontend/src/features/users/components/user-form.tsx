import { useForm } from "react-hook-form";
import { Alert } from "../../../components/ui/alert";
import { Field } from "../../../components/ui/form/field";
import { Input } from "../../../components/ui/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Radio, RadioOption } from "../../../components/ui/form/radio";
import { Select } from "../../../components/ui/form/select";
import { gql } from "../../../graphql";
import { gqlRequest } from "../../../lib/graphql-client";
import { queryClient } from "../../../lib/react-query";

interface UserFormProps {
  onSuccess?: () => void;
}

const userInputSchema = z.object({
  email: z.string().min(8),
  password: z.string(),
  role: z.string(),
  name: z.string().min(6),
  position: z.string().min(6),
  isActive: z.preprocess((val) => {
    if (typeof val === "string") {
      if (["1", "true"].includes(val.toLowerCase())) return true;
      if (["0", "false"].includes(val.toLowerCase())) return false;
    }
    return val;
  }, z.coerce.boolean()),
});

export type UserInput = z.infer<typeof userInputSchema>;

const defaultValues = {
  name: "",
  position: "",
  email: "",
  password: "",
  role: "user",
  isActive: true,
};

const CREATE_USER = gql(`
  mutation CreateUser($input: AccountInput!) {
    createAccount(input: $input) {
      id
      name
      email
      role
      position
      isActive
    }
  }
`);

const createUser = (input: UserInput) => {
  return gqlRequest(CREATE_USER, { input });
};

const UserForm = ({ onSuccess = () => null }: UserFormProps) => {
  const createMutation = useMutation({
    mutationFn: (data: UserInput) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserInput>({
    resolver: zodResolver(userInputSchema),
    defaultValues,
  });

  const role = watch("role");
  const isActive = watch("isActive");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        createMutation.mutate(data);
      })}
    >
      <div className="space-y-4">
        <Field label="Name" error={errors["name"]}>
          <Input registration={register("name")} />
        </Field>

        <Field label="Position" error={errors["position"]}>
          <Input registration={register("position")} />
        </Field>

        <Field label="Email" error={errors["email"]}>
          <Input registration={register("email")} />
        </Field>

        <Field label="Password" error={errors["password"]}>
          <Input type="password" registration={register("password")} />
        </Field>

        <Field label="Role" error={errors["role"]} separateLabel>
          <Radio name="role" value={role}>
            <RadioOption
              value="admin"
              label="Admin"
              registration={register("role")}
            />
            <RadioOption
              value="user"
              label="User"
              registration={register("role")}
            />
          </Radio>
        </Field>

        <Field label="Account Status" error={errors["isActive"]} separateLabel>
          <Select
            items={[
              { value: "true", text: "Active" },
              { value: "false", text: "Inactive" },
            ]}
            value={String(isActive)}
            registration={register("isActive")}
          />
        </Field>

        {createMutation.isError && (
          <Alert type="error" message="Failed to save user." />
        )}

        <div className="flex justify-end pt-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
