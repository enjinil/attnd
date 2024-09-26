import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

export interface InputProps {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  error?: { message?: string };
  registration?: UseFormRegisterReturn;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export type InputRef = HTMLInputElement;

const Input = React.forwardRef<InputRef, InputProps>(
  ({ className, type, registration, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          "px-3 text-gray-700 border w-full block h-8 mb-1 border-gray-300 focus:ring-2",
          className
        )}
        ref={ref}
        {...registration}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
