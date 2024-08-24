import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home/home";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { Main } from "./pages/main";
import { Heroes } from "./pages/home/heroes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
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
  {
    path: "/heroes",
    element: <Heroes />,
  },
]);
