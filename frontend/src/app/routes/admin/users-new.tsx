import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import UserForm from "@/features/users/components/user-form";
import { useNotify } from "@/hooks/useNotify";

const UsersNewPage = () => {
  const navigate = useNavigate();
  const notify = useNotify();

  const handleCreateSuccess = () => {
    notify(`User created successfully!`, "success");
    navigate("/admin/users");
  };

  return (
    <DashboardLayout>
      <div className="flex items-center mb-6">
        <h2 className="text-xl text-slate-800 font-bold mr-6">New User</h2>
        <Button variant="secondary" to="/admin/users">
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
