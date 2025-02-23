import clsx from "clsx";
import React from "react";
import { getField } from "@/utils/object";

type Alignment = "left" | "right" | "center";

export type ColumnDef<T> = {
  field: keyof T | string;
  title?: string;
  renderContent?: (item: T) => React.ReactNode;
  className?: string;
  width?: string;
  alignment?: Alignment;
  loading?: boolean;
};

export type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
};

export function Table<T extends { id: string | number }>({
  data,
  columns,
  className,
}: TableProps<T>) {
  return (
    <div
      className={clsx(
        "border border-slate-300 bg-slate-50 rounded pt-2 overflow-x-auto shadow-sm",
        className
      )}
    >
      <table className="border-collapse w-full text-sm bg-slate-50 rounded tabular-nums">
        <thead className="whitespace-nowrap">
          <tr>
            {columns.map((column) => (
              <th
                key={column.title}
                className={`border-b border-slate-300 font-medium p-2 pl-4 pt-0 pb-2 text-slate-700 ${
                  column.alignment === "right" ? "text-right" : "text-left"
                }`}
                style={{ width: column.width, minWidth: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={`${rowIndex}-${item.id}`}>
              {columns.map((column, index) => (
                <td
                  key={`${rowIndex}-${index}`}
                  className={clsx(
                    "border-b border-slate-200 px-4 py-2 text-slate-800",
                    `text-${column.alignment || "left"}`,
                    data.length - 1 == rowIndex && "border-transparent",
                    column.className
                  )}
                  style={{ width: column.width }}
                  data-testid={`column-${String(column.field)}`}
                >
                  {column.renderContent
                    ? column.renderContent(item)
                    : column.field !== "actions"
                    ? getField(item, column.field as string)
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
