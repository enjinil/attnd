import { useMemo } from "react";
import { TableProps, ColumnDef } from "./table";

interface UseTableOptions<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export function useTable<T extends { id: string | number }>({
  data,
  columns: columnDefs,
}: UseTableOptions<T>) {
  const columns = useMemo(() => {
    return columnDefs.map((column) => ({
      ...column,
      renderContent:
        column.renderContent ||
        ((item) => String(item[column.field as keyof T])),
    }));
  }, [columnDefs]);

  const tableProps: TableProps<T> = {
    data,
    columns,
  };

  return { props: tableProps };
}

export default useTable;
