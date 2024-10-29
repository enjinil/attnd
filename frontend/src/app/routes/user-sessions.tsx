import DashboardLayout from "../../components/ui/dashboard-layout";
import { SessionsFilterForm } from "../../features/sessions/components/sessions-filter-form";
import { useState } from "react";
import {
  ACCOUNT_BY_ID,
  SESSSIONS_BY_USER_ID,
  WORK_HOURS_REPORT,
} from "../../features/sessions/sessions-gqls";
import { gqlRequest } from "../../lib/graphql-client";
import { PaginatedSessionsParams } from "../../graphql/graphql";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { UserSessionsTable } from "../../features/sessions/components/user-sessions-table";
import { UserSessionsSummary } from "../../features/sessions/components/user-sessions-summary";
import {
  displayMonth,
  formatDate,
  monthBoundaryDates,
  parseMonth,
} from "../../utils/date";

const UserSessionsPage = () => {
  const [params, setParams] = useState<PaginatedSessionsParams>({
    startDate: "",
    page: 1,
  });
  const urlParams = useParams();

  const { data: accountData } = useQuery({
    queryFn: () =>
      gqlRequest(ACCOUNT_BY_ID, { id: urlParams.id || "" }),
    queryKey: ["adminAccountById", urlParams.id],
  });

  const { data: sessionsData, isLoading: isSessionsLoading } = useQuery({
    queryFn: () =>
      gqlRequest(SESSSIONS_BY_USER_ID, { id: urlParams.id || "", params }),
    queryKey: ["adminUserSessions", urlParams.id, params],
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
        userId: urlParams.id,
      }),
    queryKey: ["work-hours-report", summaryParams],
    keepPreviousData: true,
  });

  const summaryTotal =
    summaryData?.data.workHoursReport.reduce(
      (t, x) => t + Number(x?.totalHours),
      0
    ) || 0;

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-4">
        <div className="flex">
          <h2 className="text-lg font-bold py-1 mr-6">
            {accountData?.data.account?.name}
          </h2>
        </div>
      </div>
      <div className="mb-6">
        <UserSessionsSummary
          data={summaryData?.data.workHoursReport || []}
          total={summaryTotal}
          params={summaryParams}
          onChange={(changes) => setSummaryParams({ ...changes })}
          className="mb-6"
        />
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex">
          <h3 className="font-bold py-1 mr-6">Sessions</h3>
        </div>
        <SessionsFilterForm
          params={params}
          onChange={(changes) => setParams({ ...params, ...changes })}
        />
      </div>
      <UserSessionsTable
        data={sessionsData?.data.sessionsByUserId}
        onChange={(changes) => {
          console.log(changes);
          setParams({ ...params, ...changes });
        }}
        isLoading={isSessionsLoading}
        total={sessionsData?.data.totalSessionsByUserId?.count}
        page={params.page}
      />
    </DashboardLayout>
  );
};

export default UserSessionsPage;
