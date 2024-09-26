import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./routes/home";
import LoginPage from "./routes/login";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<HomePage />} />,
    <Route path="/login" element={<LoginPage />} />,
  ])
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
