import LoginForm from "../../features/auth/components/login-form";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-b from-slate-200 to-teal-50 p-4">
      <div className="border border-slate-300 bg-white max-w-96 w-full rounded px-6 pt-4 pb-6 mb-12">
        <div className="p-2">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            <span className="text-teal-500">Attnd</span>{" "}
            Login
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
