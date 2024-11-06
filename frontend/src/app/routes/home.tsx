import DashboardLayout from "@/components/layouts/dashboard-layout";
import LoginButton from "@/features/auth/components/login-button";
import { useUser } from "@/hooks/store";
import WelcomeMessage from "@/welcome-message";

const HomePage = () => {
  const user = useUser();

  return (
    <DashboardLayout>
      <WelcomeMessage />
      {!user && (
        <p className="text-center py-4">
          <span className="mr-4">Already have account?</span> <LoginButton />
        </p>
      )}
    </DashboardLayout>
  );
};

export default HomePage;
