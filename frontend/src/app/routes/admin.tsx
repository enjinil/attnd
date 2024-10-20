import { useState } from "react";
import DashboardLayout from "../../components/ui/dashboard-layout";
import { SessionsFilterForm } from "../../features/sessions/components/sessions-filter-form";
import { formatDate } from "../../utils/date";
import { AdminDashboardSessionsTable } from "../../features/sessions/components/admin-dashboard-sessions-table";
import { useQuery } from "react-query";
import { gqlRequest } from "../../lib/graphql-client";
import { ADMIN_USER_SESSIONS, UPDATED_SESSIONS_SUBS } from "../../features/sessions/sessions_gqls";
import { useSubscription } from "../../hooks/useSubscription";
import { getToken } from "../../lib/auth-provider";
import { queryClient } from "../../lib/react-query";

const todayDate = formatDate(new Date());

const AdminPage = () => {
  const [params, setParams] = useState<{ startDate: string }>({
    startDate: todayDate,
  });

  const { data } = useQuery({
    queryFn: () => gqlRequest(ADMIN_USER_SESSIONS, { params }),
    queryKey: ["adminUserSessions", params.startDate],
  });

  useSubscription(UPDATED_SESSIONS_SUBS, {
    variables: {
      token: getToken(),
    },
    onReceive() {
      queryClient.invalidateQueries(["adminUserSessions"]);
    },
  });

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-4">
        <h3 className="font-bold py-1">Sessions</h3>
        <SessionsFilterForm
          params={params}
          onChange={({ startDate }) => setParams({ startDate: startDate })}
          customText={(query, defaultText) =>
            query.startDate == todayDate ? "Today" : defaultText
          }
        />
      </div>
      <AdminDashboardSessionsTable data={data?.data.sessions} />
    </DashboardLayout>
  );
};

export default AdminPage;
