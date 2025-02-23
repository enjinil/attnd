import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/form/field";
import { Input } from "@/components/ui/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  login,
  LoginInput,
  loginInputSchema,
} from "@/lib/auth-provider";
import { useMutation } from "react-query";

interface LoginFormProps {
  onSuccess?: () => void;
}

function LoginForm({ onSuccess = () => null }: LoginFormProps) {
  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => login(data),
    mutationKey: ["login"],
    onSuccess: onSuccess,
  });

  const form = useForm<LoginInput>({ resolver: zodResolver(loginInputSchema) });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit((data) => {
          loginMutation.mutate(data);
        })}
      >
        <div className="space-y-4">
          <Field label="Email" error={errors["email"]}>
            <Input name="email" />
          </Field>

          <Field label="Password" error={errors["password"]}>
            <Input type="password" name="password" />
          </Field>

          {loginMutation.isError && (
            <Alert
              type="error"
              message="Login failed, please try again with different credentials."
            />
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={loginMutation.isLoading}
          >
            Login
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
