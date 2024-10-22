import { Table, useTable } from "../../../components/ui/table";
import { FormattedTime } from "../../../components/ui/date";
import { DurationTime } from "../../../components/ui/date/duration-time";
import { displayDate } from "../../../utils/date";
import { Pagination } from "../../../components/ui/pagination";
import { PaginatedSessionsParams, Session } from "../../../graphql/graphql";

type UserSessionsTableProps = {
  data?: Session[] | null;
  page?: number;
  total?: number;
  perPage?: number;
  isLoading?: boolean;
  onChange: (changes: Partial<PaginatedSessionsParams>) => void;
};

const formatTime = (dateString?: string | null) => {
  return dateString ? <FormattedTime date={dateString} /> : "";
};

const UserSessionsTable: React.FC<UserSessionsTableProps> = ({
  data = [],
  page = 1,
  total = 0,
  perPage = 10,
  isLoading,
  onChange,
}) => {
  const sessionsTable = useTable({
    data: data || [],
    columns: [
      {
        field: "date",
        title: "Date",
        renderContent: (item) => displayDate(item.startTime),
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

  const from = (page - 1) * 10 + 1;
  const to = Math.min((page - 1) * 10 + 10, total);

  return (
    <div>
      <Table className="mb-2" {...sessionsTable.props} />
      <div className="flex items-center justify-between flex-wrap text-slate-800 text-sm">
        <div>
          {!!total && (
            <span>
              Showing {from}-{to} of {total}
            </span>
          )}
        </div>
        <Pagination
          total={total}
          current={page}
          onPrev={() => onChange({ page: Number(page) - 1 })}
          onNext={() => onChange({ page: Number(page) + 1 })}
          disabled={isLoading}
          perPage={perPage}
        />
      </div>
    </div>
  );
};

export { UserSessionsTable };
