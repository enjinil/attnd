import { useMutation, useQuery } from "react-query";
import { Button } from "../../components/ui/button";
import { CellButton } from "../../components/ui/cell-button";
import DashboardLayout from "../../components/ui/dashboard-layout";
import { useTable } from "../../components/ui/table";
import Table from "../../components/ui/table/table";
import { gql } from "../../graphql";
import { gqlRequest } from "../../lib/graphql-client";
import { useConfirm } from "../../hooks/useConfirm";
import { queryClient } from "../../lib/react-query";

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

const DELETE_USER = gql(`
  mutation DeleteAccount($input: String!) {
    deleteAccount(input: $input) {
      message
    }
  }
`);

const UsersPage = () => {
  const { data } = useQuery({
    queryFn: () => gqlRequest(USER_ACCOUNTS),
    queryKey: ["users"],
  });
  const deleteAccountMutation = useMutation({
    mutationFn: (input: string) => gqlRequest(DELETE_USER, { input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const [confirm, ConfirmDialog] = useConfirm();

  const usersTable = useTable({
    data: data?.data.accounts || [],
    columns: [
      {
        field: "id",
        title: "ID",
        width: "50px",
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
        width: "150px",
      },
      {
        field: "isActive",
        title: "Status",
        width: "150px",
        renderContent(item) {
          return <div>{item.isActive ? "Active" : "Inactive"}</div>;
        },
      },
      {
        field: "actions",
        alignment: "right",
        width: "140px",
        renderContent(item) {
          return (
            <div className="space-x-2">
              <CellButton
                onClick={() =>
                  confirm(`Are you sure to delete ${item.email}?`).then(
                    (yes) => {
                      if (!yes) return;
                      deleteAccountMutation.mutate(item.id);
                    }
                  )
                }
              >
                delete
              </CellButton>
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
      <ConfirmDialog />
    </DashboardLayout>
  );
};

export default UsersPage;
