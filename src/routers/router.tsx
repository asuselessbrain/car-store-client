import { createBrowserRouter } from "react-router";
import App from "../App";
import Products from "../pages/products/Products";
import ViewDetails from "../pages/viewDetails/ViewDetails";
import Dashboard from "../pages/dashboard/Dashboard";
import { routerGenerator } from "../utils/routerGenerator";
import { AdminPath } from "./admin.router";
import { userRouterPath } from "./user.router";
import Login from "../pages/login/Login";
import Registration from "../registratio/Registration";
import ProtectedRoute from "../layout/ProtectedRoute";
import Home from "../pages/home/Home";
import VerifyOrder from "../pages/verifyOrder/VerifyOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "view-details/:id",
        element: <ViewDetails />,
      },
      {
        path: "verify-order",
        element: < VerifyOrder/>,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routerGenerator(AdminPath),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routerGenerator(userRouterPath),
  },
]);
