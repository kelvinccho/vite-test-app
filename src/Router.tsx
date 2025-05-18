import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Record from "./pages/Record";
import Calculator from "./pages/Calculator";
import Edit from "./pages/Edit";
import "./App.css"; // Assuming global styles are defined here
import { RecordProvider } from "./contexts/record";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
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
  {
    path: "/edit",
    element: <Edit />, // Adjusted path to match navigation logic
  },
]);


export default function AppRouter() {
  return (
    <RecordProvider>
      <div className="app-container">
        <RouterProvider router={router} />
      </div>
    </RecordProvider>
  );
}
