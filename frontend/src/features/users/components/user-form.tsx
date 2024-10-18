import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "../../../components/ui/alert";
import { Field } from "../../../components/ui/form/field";
import { Input } from "../../../components/ui/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Radio, RadioOption } from "../../../components/ui/form/radio";
import { Select } from "../../../components/ui/form/select";
import { gqlRequest } from "../../../lib/graphql-client";
import { queryClient } from "../../../lib/react-query";
import { CREATE_ACCOUNT, UPDATE_ACCOUNT } from "../user-gqls";

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

interface UserFormProps {
  onSuccess?: () => void;
  data?: Partial<UserInput>;
  id?: string;
}

const defaultValues = {
  name: "",
  position: "",
  email: "",
  password: "",
  role: "user",
  isActive: true,
};

const createUser = (input: UserInput) => {
  return gqlRequest(CREATE_ACCOUNT, { input });
};

const prepareUpdateInput = (input: UserInput) => {
  // Update password if not empty
  if (input.password !== "") {
    return input;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...inputWithoutPassword } = input;

  return inputWithoutPassword;
};

const updateUser = (id: string, input: UserInput) => {
  return gqlRequest(UPDATE_ACCOUNT, { id, input: prepareUpdateInput(input) });
};

const UserForm = ({ onSuccess = () => null, data, id }: UserFormProps) => {
  const saveMutation = useMutation({
    mutationFn: (input: UserInput) =>
      id ? updateUser(id, input) : createUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
    },
  });

  const form = useForm<UserInput>({
    resolver: zodResolver(userInputSchema),
    defaultValues: data || defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit((data) => {
          saveMutation.mutate(data);
        })}
      >
        {JSON.stringify(form.formState.defaultValues)}
        <div className="space-y-4">
          <Field label="Name" error={errors["name"]}>
            <Input name="name" />
          </Field>

          <Field label="Position" error={errors["position"]}>
            <Input name="position" />
          </Field>

          <Field label="Email" error={errors["email"]}>
            <Input name="email" />
          </Field>

          <Field label="Password" error={errors["password"]}>
            <Input type="password" name="password" />
          </Field>

          <Field label="Role" error={errors["role"]} separateLabel>
            <Radio name="role">
              <RadioOption
                value="admin"
                label="Admin"
              />
              <RadioOption
                value="user"
                label="User"
              />
            </Radio>
          </Field>

          <Field label="Account Status" error={errors["isActive"]} separateLabel>
            <Select
              items={[
                { value: "true", text: "Active" },
                { value: "false", text: "Inactive" },
              ]}
              name="isActive"
            />
          </Field>

          {saveMutation.isError && (
            <Alert type="error" message="Failed to save user." />
          )}

          <div className="flex justify-end pt-4">
            <Button type="submit">{id ? "Save Changes" : "Create User"}</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserForm;
