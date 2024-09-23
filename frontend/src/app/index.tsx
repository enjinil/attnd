import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import WelcomePage from "./routes/welcome";

const router = createBrowserRouter(
  createRoutesFromElements([<Route path="/" element={<WelcomePage />} />])
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
