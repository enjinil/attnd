import * as React from "react";
import { Label } from "./label";
import { Error } from "./error";

export interface FieldProps {
  label: string;
  error?: { message?: string };
  separateLabel?: boolean;
  children: React.ReactNode;
}

export const Field = ({ label, error, separateLabel, children }: FieldProps) => (
  <div>
    <Label>
      <div className="text-sm leading-6 inline-block">
        {label}
      </div>
      {!separateLabel && <div>{children}</div>}
    </Label>
    {separateLabel && <div>{children}</div>}
    <Error errorMessage={error?.message} />
  </div>
);
