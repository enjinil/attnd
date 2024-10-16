import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { Input } from "../../../components/ui/form/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSearchInputSchema = z.object({
  query: z.string(),
});

type UserSearchInput = z.infer<typeof userSearchInputSchema>;

type UserSearchFormProps = {
  form: UseFormReturn<UserSearchInput>;
  onSubmit?: (data: UserSearchInput) => void;
};

const useSearchForm = () =>
  useForm<UserSearchInput>({
    resolver: zodResolver(userSearchInputSchema),
  });

const UserSearchForm = ({ form, onSubmit }: UserSearchFormProps) => {
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit || (() => null))}>
        <div className="w-40">
          <Input name="query" placeholder="Search keyword" />
        </div>
      </form>
    </FormProvider>
  );
};

export { UserSearchForm, useSearchForm };
