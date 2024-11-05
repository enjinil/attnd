import clsx from "clsx";
import * as React from "react";
import { useNavigate, Link } from "react-router-dom";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
>;
type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "onClick" | "href"
>;

export interface CellButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  className?: string;
  isLoading?: boolean;
}

export const CellButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  (ButtonProps & CellButtonProps) | (AnchorProps & CellButtonProps)
>(({ children, to, onClick, className, isLoading, ...props }, ref) => {
  const navigate = useNavigate();

  const commonProps = {
    className: clsx(
      "text-xs font-medium text-black leading-5 inline-block px-2 bg-slate-200 rounded hover:bg-slate-300",
      className
    ),
    onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (to) {
        e.preventDefault();
        navigate(to);
      }
      onClick?.(e);
    },
    disabled: "disabled" in props ? props.disabled : undefined,
    ...props,
  };

  if (to) {
    return (
      <Link
        to={to}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(commonProps as AnchorProps)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      {...(commonProps as ButtonProps)}
    >
      {isLoading ? "Loading.." : children}
    </button>
  );
});
