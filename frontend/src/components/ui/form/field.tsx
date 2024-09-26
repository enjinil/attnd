import * as React from "react";
import { Label } from "./label";
import { Error } from "./error";

export interface FieldProps {
  label: string;
  error?: { message?: string };
  children: React.ReactNode;
}

export const Field = ({ label, error, children }: FieldProps) => (
  <div>
    <Label>
      {label}
      <div>{children}</div>
    </Label>
    <Error errorMessage={error?.message} />
  </div>
);
