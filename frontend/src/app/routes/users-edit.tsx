import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import DashboardLayout from "../../components/ui/dashboard-layout";
import UserForm from "../../features/users/components/user-form";
import { gql } from "../../graphql";
import { useQuery } from "react-query";
import { gqlRequest } from "../../lib/graphql-client";

const ACCOUNT = gql(`
  query Account($id: String!) {
    account(id: $id) {
      id
      email
      role
      position
      name
      isActive
    }
  }  
`);

const UsersEditPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryFn: () => gqlRequest(ACCOUNT, { id: params.id as string }),
    queryKey: ["users", params.id],
  });

  return (
    <DashboardLayout>
      <div className="flex items-center mb-6">
        <h2 className="text-xl text-slate-800 font-bold mr-6">
          Edit User {params.id}
        </h2>
        <Button variant="secondary" to="/users">
          Back
        </Button>
      </div>
      <div className="border border-slate-300 bg-slate-50 rounded px-4 py-4 max-w-lg">
        {!isLoading && (
          <UserForm id={data?.data.account.id} data={data?.data.account} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default UsersEditPage;
