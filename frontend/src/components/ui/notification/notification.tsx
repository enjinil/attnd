import clsx from "clsx";
import React from "react";

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error' | 'default';

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: NotificationVariant;
  message: string;
}

const baseStyles = "relative w-full rounded-lg border shadow-md py-2 px-3";
const variantStyles = {
  default: "bg-background text-foreground",
  info: 'bg-blue-50 text-blue-900 border-blue-400',
  success: 'bg-green-50 text-green-900 border-green-400',
  warning: 'bg-yellow-50 text-yellow-900 border-yellow-400',
  error: 'bg-red-50 text-red-900 border-red-400'
};


export function Notification({
  message,
  className = "",
  variant = "default",
  ...props
}: NotificationProps) {
  return (
    <div
      role="alert"
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
        {message}
      </div>
    </div>
  );
}
