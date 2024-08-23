import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home/home";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
