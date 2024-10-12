import clsx from "clsx";

type PaginationProps = {
  total?: number;
  current?: number;
};

const baseClass =
  "px-2 py-1 ml-2 text-sm hover:bg-slate-50 hover:shadow-sm border rounded-md";
const disabledClass =
  "pointer-events-none bg-slate-200 border-slate-200 text-slate-500";
const enabledClass = "text-slate-800 border-slate-300";

const Pagination = ({ total = 0, current = 0 }: PaginationProps) => {
  const canPrevious = current > 1;
  const canNext = current < total;

  return (
    <div className="flex justify-end py-1">
      <button
        className={clsx(baseClass, canPrevious ? enabledClass : disabledClass)}
      >
        « Previous
      </button>
      <button
        className={clsx(baseClass, canNext ? enabledClass : disabledClass)}
      >
        Next »
      </button>
    </div>
  );
};

export { Pagination };
