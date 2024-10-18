import { useState } from "react";
import DashboardLayout from "../../components/ui/dashboard-layout";
import { UserSessionPanel } from "../../features/sessions/components/user-session-panel";
import { UserSessionsTable } from "../../features/sessions/components/user-sessions-table";
import { SessionsParams } from "../../graphql/graphql";
import { SessionsFilterForm } from "../../features/sessions/components/sessions-filter-form";

const SessionsPage = () => {
  const [sessionsParams, setSessionsParams] = useState<SessionsParams>({
    page: 1,
    startDate: "",
  });

  return (
    <DashboardLayout>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 mb-6 text-slate-800 px-4">
          <UserSessionPanel />
        </div>
        <div className="w-full lg:w-1/2 mb-6 px-4 text-slate-800">
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
            params={sessionsParams}
            onChange={(changes) =>
              setSessionsParams({ ...sessionsParams, ...changes })
            }
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SessionsPage;
