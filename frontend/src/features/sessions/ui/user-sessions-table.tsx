import { useQuery } from "react-query";
import { Table, useTable } from "../../../components/ui/table";
import { gql } from "../../../graphql";
import { gqlRequest } from "../../../lib/graphql-client";
import { FormattedTime } from "../../../components/ui/date";
import { DurationTime } from "../../../components/ui/date/duration-time";
import { formatDate } from "../../../utils/date";
import { Pagination } from "../../../components/ui/pagination";
import { useEffect } from "react";
import { SessionsQuery } from "../../../graphql/graphql";

type UserSessionsTableProps = {
  query: SessionsQuery;
  onChange: (changes: Partial<SessionsQuery>) => void;
};

const USER_SESSIONS = gql(`
  query UserSessions ($query: SessionsQuery) {
    sessions (query: $query) {
      id
      startTime
      endTime
      note
      userId
    }
    totalSessions (query: $query) {
      count
    }
  }
`);

const formatTime = (dateString?: string | null) => {
  return dateString ? <FormattedTime date={dateString} /> : "";
};

const UserSessionsTable: React.FC<UserSessionsTableProps> = ({
  query,
  onChange,
}) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => gqlRequest(USER_SESSIONS, { query }),
    queryKey: ["userSessions"],
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const sessionsTable = useTable({
    data: data?.data.sessions || [],
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
    <>
      <div className="border border-slate-300 bg-slate-50 rounded pt-2 mb-2">
        <Table {...sessionsTable.props} />
      </div>
      <Pagination
        total={data?.data.totalSessions?.count || 0}
        current={query.page as number}
        onPrev={() => onChange({ page: Number(query.page) - 1 })}
        onNext={() => onChange({ page: Number(query.page) + 1 })}
        disabled={isLoading}
      />
    </>
  );
};

export { UserSessionsTable };
