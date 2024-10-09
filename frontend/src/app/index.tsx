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

const AdminRoute = () => {
  const user = useUser();
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const NotAuthenticationRoute = () => {
  const user = useUser();
  if (user) {
    const homePath = isAdminUser(user) ? "/admin" : "/";
    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<HomePage />} />,
    <Route element={<AdminRoute />}>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/new" element={<UsersNewPage />} />
      <Route path="/users/:id" element={<UsersEditPage />} />
    </Route>,
    <Route element={<NotAuthenticationRoute />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>,
  ])
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
