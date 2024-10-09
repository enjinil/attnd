import clsx from "clsx";
import React from "react";

type Alignment = "left" | "right" | "center";

export type ColumnDef<T> = {
  field: keyof T | "actions";
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
};

export function Table<T extends { id: string | number }>({
  data,
  columns,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse w-full text-sm bg-slate-50 rounded">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
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
            <tr key={item.id}>
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={clsx(
                    "border-b border-slate-200 px-4 py-2 text-slate-800",
                    `text-${column.alignment || "left"}`,
                    data.length - 1 == rowIndex && "border-transparent",
                    column.className
                  )}
                  style={{ width: column.width }}
                >
                  {column.renderContent
                    ? column.renderContent(item)
                    : column.field !== "actions"
                    ? String(item[column.field])
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
