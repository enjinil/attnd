import { Table, useTable } from "../../../components/ui/table";
import { FormattedTime } from "../../../components/ui/date";
import { DurationTime } from "../../../components/ui/date/duration-time";
import { SessionWithUser } from "../../../graphql/graphql";
import { getField } from "../../../utils/object";
import { useAlert } from "../../../hooks/useAlert";
import { Link } from "react-router-dom";

type AdminUserSessionsTableProps = {
  data?: SessionWithUser[] | null;
};

const formatTime = (dateString?: string | null) => {
  return dateString ? <FormattedTime date={dateString} /> : "";
};

const AdminDashboardSessionsTable: React.FC<AdminUserSessionsTableProps> = ({
  data,
}) => {
  const [alertModal, AlertDialog] = useAlert();

  const sessionsTable = useTable({
    data: data || [],
    columns: [
      {
        field: "user.name",
        title: "User",
        className: "whitespace-nowrap",
        renderContent: (item) => (
          <>
            <Link className="hover:text-blue-600" to={`/admin/user-sessions/${item.userId}`}>
              {getField(item, "user.name")}
            </Link>
            <span> ({getField(item, "user.position") || "-"})</span>
          </>
        ),
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
              onClick={() => alertModal(item.note || "")}
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
      <Table {...sessionsTable.props} />
      <AlertDialog />
    </>
  );
};

export { AdminDashboardSessionsTable };
