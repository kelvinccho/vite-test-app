import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Record from "./pages/Record";
import Calculator from "./pages/Calculator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: "/record",
    element: <Record />,
  },
  {
    path: "/calculator",
    element: <Calculator />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
