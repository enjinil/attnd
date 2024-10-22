import { FormProvider, useForm } from "react-hook-form";
import { forwardRef, memo, useEffect } from "react";
import { Monthpicker } from "../../../components/ui/form/monthpicker";

type Params = { month: string };

type SummaryFilterFormProps = {
  params: Params;
  onChange?: (changes: Params) => void;
  customText?: (query: Params, defaultText: string) => string;
};

const SummaryFilterForm: React.FC<SummaryFilterFormProps> = ({
  params,
  onChange,
}) => {
  const form = useForm<Params>({ defaultValues: params });
  const month = form.watch("month");

  useEffect(() => {
    onChange?.({ month });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  const CustomButtons = memo(
    forwardRef<HTMLButtonElement>(
      ({ onClick }: { onClick?: () => void }, ref) => (
        <div className="flex">
          <button
            ref={ref}
            onClick={onClick}
            className="inline-flex items-center h-8 px-4 text-sm text-slate-800 bg-slate-100 hover:shadow-sm hover:bg-slate-50 border border-slate-800 rounded-[16px]"
          >
            {`In ${month}`}
          </button>
        </div>
      )
    )
  );

  return (
    <>
      <FormProvider {...form}>
        <Monthpicker
          name="month"
        >
          <CustomButtons />
        </Monthpicker>
      </FormProvider>
    </>
  );
};

export { SummaryFilterForm };
