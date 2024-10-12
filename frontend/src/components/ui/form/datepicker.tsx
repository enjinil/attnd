import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";
import { Input } from "./input";
import { easepick } from "@easepick/bundle";
import css from "@easepick/bundle/dist/index.css?inline";
import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

export interface DatepickerProps {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  registration?: UseFormRegisterReturn;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  autoComplete?: "off" | "on";
  children?: (
    value: string | null | undefined,
    open: () => void
  ) => React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export type InputRef = HTMLInputElement;

const Datepicker = forwardRef<InputRef, DatepickerProps>((props, ref) => {
  const internalRef = useRef<InputRef>(null);
  const inputId = useId();

  useImperativeHandle(
    ref,
    () => {
      return internalRef.current as InputRef;
    },
    []
  );

  useEffect(() => {
    if (!internalRef || !internalRef.current) return;

    internalRef.current.id = inputId;

    new easepick.create({
      element: internalRef.current,
      css: css,
      zIndex: 10,
      setup(picker) {
        picker.on("select", () => {
          const input = internalRef.current as HTMLInputElement;
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
          )?.set;

          const value = input.value;
          input.value = "";
          nativeInputValueSetter?.call(input, value);

          const event = new Event("input", { bubbles: true });
          input?.dispatchEvent(event);
        });
      },
    });
  }, []);

  return (
    <div>
      <div className={clsx("h-0 w-0 overflow-hidden")}>
        <Input
          ref={internalRef}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      <div className="flex">
        {props.children?.(props.value, () => {
          internalRef.current?.click();
        })}
      </div>
    </div>
  );
});

export { Datepicker };
