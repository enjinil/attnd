import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./routes/home";
import LoginPage from "./routes/login";
import UsersPage from "./routes/admin/users";
import { useUser } from "../hooks/store";
import UsersNewPage from "./routes/admin/users-new";
import AdminPage from "./routes/admin";
import { isAdminUser } from "../utils/user";
import UsersEditPage from "./routes/admin/users-edit";
import useBootstrapUser from "../features/auth/hooks/useBootstrapUser";
import SessionsPage from "./routes/sessions";
import UserSessionsPage from "./routes/admin/user-sessions";
import LoadingDots from "../components/ui/loading-dots";

const AdminRoute = () => {
  const user = useUser();
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const UserRoute = () => {
  const user = useUser();
  if (user?.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const NotAuthenticationRoute = () => {
  const user = useUser();
  if (user) {
    const homePath = isAdminUser(user) ? "/admin" : "/sessions";
    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<UserRoute />}>
      <Route path="/sessions" element={<SessionsPage />} />,
    </Route>,
    <Route element={<AdminRoute />}>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/users/new" element={<UsersNewPage />} />
      <Route path="/admin/users/:id" element={<UsersEditPage />} />
      <Route path="/admin/user-sessions/:id" element={<UserSessionsPage />} />
    </Route>,
    <Route element={<NotAuthenticationRoute />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />,
    </Route>,
  ])
);

const PageLoading = () => (
  <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-b from-slate-200 to-teal-50 px-3 sm:px-0">
    <LoadingDots />
  </div>
);

const App = () => {
  const { isLoading } = useBootstrapUser();

  return isLoading ? <PageLoading /> : <RouterProvider router={router} />;
};

export default App;
