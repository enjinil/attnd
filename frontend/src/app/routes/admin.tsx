import { useEffect, useState } from "react";
import DashboardLayout from "../../components/ui/dashboard-layout";
import { SessionsFilterForm } from "../../features/sessions/components/sessions-filter-form";
import { displayDate } from "../../utils/date";
import { AdminDashboardSessionsTable } from "../../features/sessions/components/admin-dashboard-sessions-table";
import { useQuery } from "react-query";
import { gqlRequest } from "../../lib/graphql-client";
import { ADMIN_USER_SESSIONS, UPDATED_SESSIONS_SUBS } from "../../features/sessions/sessions_gqls";
import { useSubscription } from "../../hooks/useSubscription";
import { getToken } from "../../lib/auth-provider";
import { queryClient } from "../../lib/react-query";

const todayDate = displayDate(new Date());

const AdminPage = () => {
  const [params, setParams] = useState<{ startDate: string }>({
    startDate: todayDate,
  });

  const { data, refetch } = useQuery({
    queryFn: () => gqlRequest(ADMIN_USER_SESSIONS, { params }),
    queryKey: ["adminUserSessions"],
  });

  useSubscription(UPDATED_SESSIONS_SUBS, {
    variables: {
      token: getToken(),
    },
    onReceive() {
      queryClient.invalidateQueries(["adminUserSessions"]);
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

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
