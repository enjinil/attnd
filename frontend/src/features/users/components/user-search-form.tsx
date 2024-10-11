import { useForm, UseFormReturn } from "react-hook-form";
import { Input } from "../../../components/ui/form/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSearchInputSchema = z.object({
  query: z.string(),
});

type UserSearchInput = z.infer<typeof userSearchInputSchema>;

type UserSearchFormProps = {
  form: UseFormReturn<UserSearchInput>;
  onSubmit: (data: UserSearchInput) => void;
};

const useSearchForm = () => useForm<UserSearchInput>({
  resolver: zodResolver(userSearchInputSchema),
});

const UserSearchForm = ({ form, onSubmit }: UserSearchFormProps) => {
  const { register, handleSubmit } = form;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-40">
          <Input registration={register("query")} placeholder="Search keyword" />
        </div>
      </form>
    </div>
  );
};

export { UserSearchForm, useSearchForm };
