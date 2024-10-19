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
import UsersPage from "./routes/users";
import { useUser } from "../hooks/store";
import UsersNewPage from "./routes/users-new";
import AdminPage from "./routes/admin";
import { isAdminUser } from "../utils/user";
import UsersEditPage from "./routes/users-edit";
import useBootstrapUser from "../features/auth/hooks/useBootstrapUser";
import SessionsPage from "./routes/sessions";
import UserSessionsPage from "./routes/user-sessions";

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
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/new" element={<UsersNewPage />} />
      <Route path="/users/:id" element={<UsersEditPage />} />
      <Route path="/user-sessions/:id" element={<UserSessionsPage />} />
    </Route>,
    <Route element={<NotAuthenticationRoute />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />,
    </Route>,
  ])
);

const App = () => {
  const { isLoading } = useBootstrapUser();

  return isLoading ? "Loading user.." : <RouterProvider router={router} />;
};

export default App;
