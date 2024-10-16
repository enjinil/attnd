import { forwardRef, ReactElement } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController, useFormContext } from "react-hook-form";
import { formatDate } from "../../../utils/date";

type DatepickerProps = {
  children?: ReactElement;
  className?: string;
  name: string;
};

const DatepickerInput = forwardRef<HTMLInputElement>((props, ref) => {
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

const Datepicker: React.FC<DatepickerProps> = ({
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
        onChange={(dateValue) => field.onChange(formatDate(dateValue))}
        customInput={children || <DatepickerInput />}
        dateFormat="YYYY/MM/dd"
      />
    </div>
  );
};

export { Datepicker };
