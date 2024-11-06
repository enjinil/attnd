import { forwardRef, ReactElement } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useController, useFormContext } from "react-hook-form";
import { displayMonth } from "@/utils/date";
import DatePicker from "react-datepicker";

type MonthpickerProps = {
  children?: ReactElement;
  className?: string;
  name: string;
};

const MonthpickerInput = forwardRef<HTMLInputElement>((props, ref) => {
  return (
    <input
      className={
        "px-3 text-gray-700 border w-full block h-8 mb-1 border-gray-300 focus:ring-2"
      }
      autoComplete="off"
      readOnly
      ref={ref}
      {...props}
    />
  );
});

const Monthpicker: React.FC<MonthpickerProps> = ({
  name,
  children,
  className,
}) => {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name: name,
    defaultValue: "",
  });

  return (
    <div className={className}>
      <DatePicker
        value={field.value}
        onChange={(dateValue) => field.onChange(displayMonth(dateValue))}
        customInput={children || <MonthpickerInput />}
        dateFormat="YYYY/MM"
        showMonthYearPicker
        showFullMonthYearPicker
      />
    </div>
  );
};

export { Monthpicker };
