import { createContext, useContext, forwardRef, ReactNode } from "react";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

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

export const Radio = ({ children, name, value }: RadioProps) => {
  return (
    <RadioContext.Provider value={{ name, value }}>
      <div className="flex flex-wrap">{children}</div>
    </RadioContext.Provider>
  );
};

// RadioOption Component
interface RadioOptionProps {
  value: string;
  label: string;
  checked?: boolean;
  registration?: UseFormRegisterReturn;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  ({ value, label, registration, ...props }, ref) => {
    const context = useContext(RadioContext);

    if (!context) {
      throw new Error("RadioOption must be used within a Radio component");
    }

    const { name, value: selectedValue } = context;

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
          ref={ref}
          className="mr-2"
          type="radio"
          name={name}
          value={value}
          {...registration}
          {...props}
        />
        {label}
      </label>
    );
  }
);

RadioOption.displayName = "RadioOption";
