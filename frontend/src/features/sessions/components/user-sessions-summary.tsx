import {
  SummaryFilterForm,
  SummaryFilterFormProps,
} from "./summary-filter-form";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

import clsx from "clsx";
import { displayDecimal } from "../../../utils/number";

interface UserSessionsSummaryProps extends SummaryFilterFormProps {
  className?: string;
  data: Array<{
    workDate: string;
    totalHours: string;
  }>;
}

const UserSessionsSummary: React.FC<UserSessionsSummaryProps> = ({
  className,
  params,
  onChange,
  data,
}) => {
  const total = data.reduce((acc, item) => acc + Number(item?.totalHours), 0);

  return (
    <div className={clsx(className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm border-l border-l-2 border-teal-500 my-1 bg-slate-100 rounded-r shadow-sm h-8 flex items-center px-3">
          Total hours: <span className="font-semibold pl-1">{total}</span>
        </h3>
        <SummaryFilterForm params={params} onChange={onChange} />
      </div>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%">
          <BarChart width={150} height={40} data={data || []}>
            <Bar
              maxBarSize={20}
              dataKey="totalHours"
              fill="#14b8a6"
              label={{ position: "top", fontSize: 10, formatter: displayDecimal }}
            />
            <XAxis
              tickFormatter={(x: string) => x.split("-")[2]}
              dataKey="workDate"
              type="category"
              minTickGap={0}
              fontSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { UserSessionsSummary };
