import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import { CellButton } from "@/components/ui/cell-button";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useTable } from "@/components/ui/table";
import Table from "@/components/ui/table/table";
import { gqlRequest } from "@/lib/graphql-client";
import { useConfirm } from "@/hooks/useConfirm";
import { useNotify } from "@/hooks/useNotify";
import {
  UserSearchForm,
  useSearchForm,
} from "@/features/users/components/user-search-form";
import { useState } from "react";
import { DELETE_USER, USER_ACCOUNTS } from "@/features/users/user-gqls";

const UsersPage = () => {
  const queryClient = useQueryClient();
  const notify = useNotify();
  const searchForm = useSearchForm();
  const [confirm, ConfirmDialog] = useConfirm();
  const [queryTimestamp, setQueryTimestamp] = useState("0");

  const { data } = useQuery({
    queryFn: () =>
      gqlRequest(USER_ACCOUNTS, { query: searchForm.getValues().query }),
    queryKey: ["users", queryTimestamp],
  });
  const deleteAccountMutation = useMutation({
    mutationFn: (input: string) => gqlRequest(DELETE_USER, { input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notify(`User deleted successfully!`, "success");
    },
  });

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
        className: "text-nowrap"
      },
      {
        field: "position",
        title: "Position",
        className: "text-nowrap"
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
        field: "sessions",
        title: "",
        width: "80px",
        renderContent(item) {
          return (
            <CellButton to={`/admin/user-sessions/${item.id}`}>sessions</CellButton>
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
              <CellButton to={`/admin/users/${item.id}`}>edit</CellButton>
            </div>
          );
        },
      },
    ],
  });

  return (
    <DashboardLayout>
      <div className="flex items-center flex-wrap justify-between mb-6">
        <h2 className="text-xl text-slate-800 font-bold mb-1 mr-6">Users</h2>
        <div className="flex space-x-4">
          <UserSearchForm
            form={searchForm}
            onSubmit={() => setQueryTimestamp(new Date().getTime().toString())}
          />
          <Button to="/admin/users/new">New User</Button>
        </div>
      </div>
      <Table className="mb-2" {...usersTable.props} />
      <ConfirmDialog />
    </DashboardLayout>
  );
};

export default UsersPage;
