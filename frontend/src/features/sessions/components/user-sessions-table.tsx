import { useQuery } from "react-query";
import { Table, useTable } from "../../../components/ui/table";
import { gqlRequest } from "../../../lib/graphql-client";
import { FormattedTime } from "../../../components/ui/date";
import { DurationTime } from "../../../components/ui/date/duration-time";
import { formatDate } from "../../../utils/date";
import { Pagination } from "../../../components/ui/pagination";
import { useEffect } from "react";
import { PaginatedSessionsParams } from "../../../graphql/graphql";
import { USER_SESSIONS } from "../sessions_gqls";

type UserSessionsTableProps = {
  params: PaginatedSessionsParams;
  onChange: (changes: Partial<PaginatedSessionsParams>) => void;
};

const formatTime = (dateString?: string | null) => {
  return dateString ? <FormattedTime date={dateString} /> : "";
};

const UserSessionsTable: React.FC<UserSessionsTableProps> = ({
  params,
  onChange,
}) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => gqlRequest(USER_SESSIONS, { params }),
    queryKey: ["userSessions"],
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const sessionsTable = useTable({
    data: data?.data.userSessions || [],
    columns: [
      {
        field: "date",
        title: "Date",
        renderContent: (item) => formatDate(item.startTime),
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
      {
        field: "note",
        title: "Note",
        renderContent(item) {
          return item.note ? (
            <a
              className="text-blue-500"
              href="#"
              onClick={() => alert(item.note)}
            >
              Show note
            </a>
          ) : (
            "-"
          );
        },
      },
    ],
  });

  return (
    <div>
      <Table className="mb-2" {...sessionsTable.props} />
      <Pagination
        total={data?.data.userTotalSessions?.count || 0}
        current={params.page as number}
        onPrev={() => onChange({ page: Number(params.page) - 1 })}
        onNext={() => onChange({ page: Number(params.page) + 1 })}
        disabled={isLoading}
      />
    </div>
  );
};

export { UserSessionsTable };
