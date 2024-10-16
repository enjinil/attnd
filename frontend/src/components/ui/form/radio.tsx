import { createContext, useContext, ReactNode } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

// Context
interface RadioContextType {
  name: string;
  value?: string;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

// Radio Component
interface RadioProps {
  children: ReactNode;
  name: string;
  value?: string;
  error?: { message?: string };
}

export const Radio = ({ children, name }: RadioProps) => {
  return (
    <RadioContext.Provider value={{ name }}>
      <div className="flex flex-wrap">{children}</div>
    </RadioContext.Provider>
  );
};

// RadioOption Component
interface RadioOptionProps {
  value: string;
  label: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioOption: React.FC<RadioOptionProps> = ({
  value,
  label,
  ...props
}) => {
  const context = useContext(RadioContext);
  const { register, watch } = useFormContext();

  if (!context) {
    throw new Error("RadioOption must be used within a Radio component");
  }

  const selectedValue = watch(context.name);

  return (
    <label
      className={clsx(
        "pointer mr-2 rounded-md border-2 cursor-pointer pl-2 pr-3 h-8 flex items-center",
        value == selectedValue
          ? "bg-blue-200 border-blue-500"
          : "bg-slate-100 border-slate-200"
      )}
    >
      <input
        className="mr-2"
        type="radio"
        value={value}
        {...register(context.name)}
        {...props}
      />
      {label}
    </label>
  );
};

RadioOption.displayName = "RadioOption";
