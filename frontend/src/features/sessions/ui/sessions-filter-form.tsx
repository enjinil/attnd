import { FormProvider, useForm } from "react-hook-form";
import { Datepicker } from "../../../components/ui/form/datepicker";
import { SessionsQuery } from "../../../graphql/graphql";
import { forwardRef, memo, useEffect } from "react";

type SessionsFilterFormProps = {
  query: SessionsQuery;
  onChange: (changes: Partial<SessionsQuery>) => void;
};

const SessionsFilterForm: React.FC<SessionsFilterFormProps> = ({
  query,
  onChange,
}) => {
  const form = useForm<SessionsQuery>({ defaultValues: query });
  const startDate = form.watch("startDate");

  useEffect(() => {
    onChange({ startDate, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  const CustomButtons = memo(forwardRef<HTMLButtonElement>(
    ({ onClick }: { onClick?: () => void }, ref) => (
      <div className="flex">
        <button
          ref={ref}
          onClick={onClick}
          className="inline-flex items-center h-8 px-4 text-sm text-slate-800 bg-slate-100 hover:shadow-sm hover:bg-slate-50 border border-slate-800 rounded-[16px]"
        >
          {startDate ? `On ${startDate}` : "Filter by Date"}
        </button>
        {startDate && (
          <button
            onClick={() => {
              form.setValue("startDate", "");
              form.setValue("page", 1);
            }}
            className="inline-flex items-center justify-center ml-2 h-8 w-8 text-sm text-slate-800 bg-slate-100 hover:shadow-sm hover:bg-slate-50 border border-slate-800 rounded-[16px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    )
  ));

  return (
    <>
      <FormProvider {...form}>
        <Datepicker name="startDate">
          <CustomButtons />
        </Datepicker>
      </FormProvider>
    </>
  );
};

export { SessionsFilterForm };
