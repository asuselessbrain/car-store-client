import { createBrowserRouter } from "react-router";
import App from "../App";
import Products from "../pages/products/Products";
import ViewDetails from "../pages/viewDetails/ViewDetails";
import { routerGenerator } from "../utils/routerGenerator";
import { AdminPath } from "./admin.router";
import { userRouterPath } from "./user.router";
import Login from "../pages/login/Login";
import Registration from "../pages/registratio/Registration";
import ProtectedRoute from "../layout/ProtectedRoute";
import Home from "../pages/home/Home";
import VerifyOrder from "../pages/verifyOrder/VerifyOrder";
import Contact from "../pages/contact/Contact";
import VerifyOTP from "../pages/verifyOTP/verifyOTP";
import Dashboard from "../layout/Dashboard";

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
        element: <VerifyOrder />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOTP />,
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
