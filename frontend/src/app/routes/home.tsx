import Header from "../../components/ui/header/header";
import LoginButton from "../../features/auth/components/login-button";
import { useAppSelector } from "../../hooks/store";
import WelcomeMessage from "../../welcome-message";

const HomePage = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col items-center min-h-screen w-screen bg-gradient-to-b from-slate-200 to-teal-50 ">
      <Header />
      <main className="flex-grow container py-12">
        <WelcomeMessage />
        {!user && (
          <p className="text-center py-4">
            <span className="mr-4">Already have account?</span> <LoginButton />
          </p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
