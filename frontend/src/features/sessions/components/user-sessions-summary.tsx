import { useState } from "react";
import { SummaryFilterForm } from "./summary-filter-form";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

import clsx from "clsx";
import { useQuery } from "react-query";
import { gqlRequest } from "../../../lib/graphql-client";
import { WORK_HOURS_REPORT } from "../sessions_gqls";
import {
  formatDate,
  monthBoundaryDates,
  parseMonth,
} from "../../../utils/date";

type UserSessionsSummaryProps = {
  className?: string;
};

const UserSessionsSummary: React.FC<UserSessionsSummaryProps> = ({
  className,
}) => {
  const [params, setParams] = useState({ month: "2024/10" });
  const [startDate, endDate] = monthBoundaryDates(parseMonth(params.month));

  const { isLoading, data } = useQuery({
    queryFn: () =>
      gqlRequest(WORK_HOURS_REPORT, {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      }),
    queryKey: ["work-hours-report", JSON.stringify(params)],
  });

  const total = isLoading
    ? "-"
    : data?.data.workHoursReport.reduce((t, x) => t + Number(x?.totalHours), 0);

  return (
    <div className={clsx(className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm border-l border-l-2 border-teal-500 my-1 bg-slate-100 rounded-r shadow-sm h-8 flex items-center px-3">
          Total hours: <span className="font-semibold pl-1">{total}</span>
        </h3>
        <SummaryFilterForm
          params={params}
          onChange={(changes) => setParams(changes)}
        />
      </div>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%">
          <BarChart
            width={150}
            height={40}
            data={data?.data.workHoursReport || []}
          >
            <Bar
              maxBarSize={20}
              dataKey="totalHours"
              fill="#14b8a6"
              label={{ position: "top", fontSize: 10 }}
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
