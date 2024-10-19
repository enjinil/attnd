import DashboardLayout from "../../components/ui/dashboard-layout";
import { SessionsFilterForm } from "../../features/sessions/components/sessions-filter-form";
import { useEffect, useState } from "react";
import { SESSSIONS_BY_USER_ID } from "../../features/sessions/sessions_gqls";
import { gqlRequest } from "../../lib/graphql-client";
import { PaginatedSessionsParams } from "../../graphql/graphql";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { UserSessionsTable } from "../../features/sessions/components/user-sessions-table";

const UserSessionsPage = () => {
  const [params, setParams] = useState<PaginatedSessionsParams>({
    startDate: "",
    page: 1,
  });
  const urlParams = useParams();

  const { data, isLoading, refetch } = useQuery({
    queryFn: () =>
      gqlRequest(SESSSIONS_BY_USER_ID, { id: urlParams.id || "", params }),
    queryKey: ["adminUserSessions"],
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-4">
        <div className="flex">
          <h3 className="font-bold py-1 mr-6">{data?.data.account?.name}'s sessions</h3>
        </div>
        <SessionsFilterForm
          params={params}
          onChange={(changes) => setParams({ ...params, ...changes })}
        />
      </div>
      <UserSessionsTable
        data={data?.data.sessionsByUserId}
        onChange={(changes) => {
          console.log(changes)
          setParams({ ...params, ...changes })
        }
        }
        isLoading={isLoading}
        total={data?.data.totalSessionsByUserId?.count}
        page={params.page}
      />
    </DashboardLayout>
  );
};

export default UserSessionsPage;
