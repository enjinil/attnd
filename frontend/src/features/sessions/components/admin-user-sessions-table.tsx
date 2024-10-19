import { useQuery } from "react-query";
import { Table, useTable } from "../../../components/ui/table";
import { gqlRequest } from "../../../lib/graphql-client";
import { FormattedTime } from "../../../components/ui/date";
import { DurationTime } from "../../../components/ui/date/duration-time";
import { useEffect } from "react";
import { SessionsParams } from "../../../graphql/graphql";
import { ADMIN_USER_SESSIONS, UPDATED_SESSIONS_SUBS } from "../sessions_gqls";
import { useSubscription } from "../../../hooks/useSubscription";
import { getToken } from "../../../lib/auth-provider";
import { queryClient } from "../../../lib/react-query";
import { getField } from "../../../utils/object";

type AdminUserSessionsTableProps = {
  params: SessionsParams;
};

const formatTime = (dateString?: string | null) => {
  return dateString ? <FormattedTime date={dateString} /> : "";
};

const AdminUserSessionsTable: React.FC<AdminUserSessionsTableProps> = ({
  params,
}) => {
  useSubscription(UPDATED_SESSIONS_SUBS, {
    variables: {
      token: getToken(),
    },
    onReceive() {
      queryClient.invalidateQueries(["adminUserSessions"]);
    },
  });

  const { data, refetch } = useQuery({
    queryFn: () => gqlRequest(ADMIN_USER_SESSIONS, { params }),
    queryKey: ["adminUserSessions"],
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const sessionsTable = useTable({
    data: data?.data.sessions || [],
    columns: [
      {
        field: "user.name",
        title: "User",
        className: "whitespace-nowrap",
        renderContent: (item) => `${getField(item, "user.name")} (${getField(item, "user.position") || "-"})`,
      },
      {
        field: "startTime",
        title: "Start Time",
        renderContent: (item) => formatTime(item.startTime),
      },
      {
        field: "endTime",
        title: "End Time",
        renderContent: (item) => formatTime(item.endTime),
      },
      {
        field: "duration",
        title: "Duration",
        renderContent: (item) => (
          <DurationTime from={item.startTime} to={item.endTime} />
        ),
      },
    ],
  });

  return <Table {...sessionsTable.props} />;
};

export { AdminUserSessionsTable };
