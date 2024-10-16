import { useState } from "react";
import DashboardLayout from "../../components/ui/dashboard-layout";
import { UserSessionPanel } from "../../features/sessions/ui/user-session-panel";
import { UserSessionsTable } from "../../features/sessions/ui/user-sessions-table";
import { SessionsQuery } from "../../graphql/graphql";
import { SessionsFilterForm } from "../../features/sessions/ui/sessions-filter-form";

const SessionsPage = () => {
  const [sessionsQuery, setSessionsQuery] = useState<SessionsQuery>({
    page: 1,
    startDate: "",
  });

  return (
    <DashboardLayout>
      <div className="flex flex-wrap -mx-4">
        <div className="lg:w-1/2 mb-6 text-slate-800 px-4">
          <UserSessionPanel />
        </div>
        <div className="lg:w-1/2 mb-6 px-4 text-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold my-1">Past Sessions</h3>
            <SessionsFilterForm
              query={sessionsQuery}
              onChange={(changes) =>
                setSessionsQuery({ ...sessionsQuery, ...changes })
              }
            />
          </div>
          <UserSessionsTable
            query={sessionsQuery}
            onChange={(changes) =>
              setSessionsQuery({ ...sessionsQuery, ...changes })
            }
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SessionsPage;
