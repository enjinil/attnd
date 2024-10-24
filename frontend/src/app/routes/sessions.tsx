import { useState } from "react";
import DashboardLayout from "../../components/ui/dashboard-layout";
import { UserSessionPanel } from "../../features/sessions/components/user-session-panel";
import { UserSessionsTable } from "../../features/sessions/components/user-sessions-table";
import { PaginatedSessionsParams } from "../../graphql/graphql";
import { SessionsFilterForm } from "../../features/sessions/components/sessions-filter-form";
import { gqlRequest } from "../../lib/graphql-client";
import { USER_SESSIONS } from "../../features/sessions/sessions_gqls";
import { useQuery } from "react-query";
import { UserSessionsSummary } from "../../features/sessions/components/user-sessions-summary";

const SessionsPage = () => {
  const [params, setSessionsParams] = useState<PaginatedSessionsParams>({
    page: 1,
    startDate: "",
  });

  const { data, isLoading } = useQuery({
    queryFn: () => gqlRequest(USER_SESSIONS, { params }),
    queryKey: ["userSessions", JSON.stringify(params)],
  });

  return (
    <DashboardLayout>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 mb-6 text-slate-800 px-4">
          <UserSessionPanel />
        </div>
        <div className="w-full lg:w-1/2 mb-6 px-4 text-slate-800">
          <UserSessionsSummary className="mb-6" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold my-1">Past Sessions</h3>
            <SessionsFilterForm
              params={params}
              onChange={(changes) =>
                setSessionsParams({ ...params, ...changes })
              }
              allowClear
            />
          </div>
          <UserSessionsTable
            data={data?.data.userSessions}
            total={data?.data.userTotalSessions.count}
            page={params.page}
            onChange={(changes) => setSessionsParams({ ...params, ...changes })}
            isLoading={isLoading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SessionsPage;
