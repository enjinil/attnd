import { useQuery } from "react-query";
import { Button } from "../../components/ui/button";
import { CellButton } from "../../components/ui/cell-button";
import DashboardLayout from "../../components/ui/dashboard-layout";
import { useTable } from "../../components/ui/table";
import Table from "../../components/ui/table/table";
import { gql } from "../../graphql";
import { gqlRequest } from "../../lib/graphql-client";

const USER_ACCOUNTS = gql(`
  query UserAccounts {
    accounts {
      id
      email
      role
      position
      name
      isActive
    }
  }
`);

const UsersPage = () => {
  const {data} = useQuery({
    queryFn: () => gqlRequest(USER_ACCOUNTS),
    queryKey: ["users"]
  })

  const usersTable = useTable({
    data: data?.data.accounts || [],
    columns: [
      {
        field: "id",
        title: "ID",
        width: "50px"
      },
      {
        field: "name",
        title: "Name",
      },
      {
        field: "position",
        title: "Position",
      },
      {
        field: "email",
        title: "Email",
      },
      {
        field: "role",
        title: "Role",
        width: "150px"
      },
      {
        field: "isActive",
        title: "Status",
        width: "150px",
        renderContent(item) {
          return (
            <div>{item.isActive ? "Active" : "Inactive"}</div>
          );
        },
      },
      {
        field: "actions",
        alignment: "right",
        width: "140px",
        renderContent(item) {
          return (
            <div className="space-x-2">
              <CellButton>delete</CellButton>
              <CellButton to={`/users/${item.id}`}>edit</CellButton>
            </div>
          );
        },
      },
    ],
  });

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-slate-800 font-bold mr-6">Users</h2>
        <Button to="/users/new">New User</Button>
      </div>
      <div className="border border-slate-300 bg-slate-50 rounded pt-2 mb-2">
        <Table {...usersTable.props} />
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
