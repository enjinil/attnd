import { useState } from "react";
import DashboardLayout from "../../components/ui/dashboard-layout";
import { UserSessionPanel } from "../../features/sessions/components/user-session-panel";
import { UserSessionsTable } from "../../features/sessions/components/user-sessions-table";
import { PaginatedSessionsParams } from "../../graphql/graphql";
import { SessionsFilterForm } from "../../features/sessions/components/sessions-filter-form";
import { gqlRequest } from "../../lib/graphql-client";
import {
  USER_SESSIONS,
  WORK_HOURS_REPORT,
} from "../../features/sessions/sessions-gqls";
import { useQuery } from "react-query";
import { UserSessionsSummary } from "../../features/sessions/components/user-sessions-summary";
import {
  displayMonth,
  formatDate,
  monthBoundaryDates,
  parseMonth,
} from "../../utils/date";

const SessionsPage = () => {
  const [sessionsParams, setSessionsParams] = useState<PaginatedSessionsParams>(
    {
      page: 1,
      startDate: "",
    }
  );

  const { data: sessionsData, isLoading: isSessionsLoading } = useQuery({
    queryFn: () => gqlRequest(USER_SESSIONS, { params: sessionsParams }),
    queryKey: ["userSessions", sessionsParams],
    keepPreviousData: true,
  });

  const today = new Date();
  const [summaryParams, setSummaryParams] = useState({
    month: displayMonth(today),
  });
  const [startDate, endDate] = monthBoundaryDates(
    parseMonth(summaryParams.month)
  );

  const { data: summaryData } = useQuery({
    queryFn: () =>
      gqlRequest(WORK_HOURS_REPORT, {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      }),
    queryKey: ["work-hours-report", summaryParams],
  });

  return (
    <DashboardLayout>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 mb-6 text-slate-800 px-4">
          <UserSessionPanel />
        </div>
        <div className="w-full lg:w-1/2 mb-6 px-4 text-slate-800">
          <UserSessionsSummary
            data={summaryData?.data.workHoursReport || []}
            params={summaryParams}
            onChange={(changes) => setSummaryParams({ ...changes })}
            className="mb-6"
          />
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold my-1">Past Sessions</h3>
            <SessionsFilterForm
              params={sessionsParams}
              onChange={(changes) =>
                setSessionsParams({ ...sessionsParams, ...changes })
              }
              allowClear
            />
          </div>
          <UserSessionsTable
            data={sessionsData?.data.userSessions}
            onChange={(changes) =>
              setSessionsParams({ ...sessionsParams, ...changes })
            }
            total={sessionsData?.data.userTotalSessions.count}
            page={sessionsParams.page}
            isLoading={isSessionsLoading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SessionsPage;
