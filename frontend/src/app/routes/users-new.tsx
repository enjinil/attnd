import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import DashboardLayout from "../../components/ui/dashboard-layout";
import UserForm from "../../features/users/components/user-form";

const UsersNewPage = () => {
  const navigate = useNavigate();

  const handleCreateSuccess = () => {
    navigate("/users");
  };

  return (
    <DashboardLayout>
      <div className="flex items-center mb-6">
        <h2 className="text-xl text-slate-800 font-bold mr-6">New User</h2>
        <Button variant="secondary" to="/users">
          Back
        </Button>
      </div>
      <div className="border border-slate-300 bg-slate-50 rounded px-4 py-4 max-w-lg">
        <UserForm onSuccess={handleCreateSuccess} />
      </div>
    </DashboardLayout>
  );
};

export default UsersNewPage;
