import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home/home";
import { Login } from "./pages/auth/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
