import clsx from "clsx";

type PaginationProps = {
  total?: number;
  current?: number;
};

const baseClass =
  "flex items-center px-2 py-1 ml-2 text-sm hover:bg-slate-50 hover:shadow-sm border rounded-md";
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-3 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
          />
        </svg>
        Previous
      </button>
      <button
        className={clsx(baseClass, canNext ? enabledClass : disabledClass)}
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-3 ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export { Pagination };
