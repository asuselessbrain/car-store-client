import UpdateProduct from "../pages/dashboard/admin/UpdateProduct";
import Orders from "../pages/dashboard/user/Orders";
import UserDashboard from "../pages/dashboard/user/UserDashboard";

export const userRouterPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Orders",
    path: "order",
    element: <Orders />,
  },
  {
    name: "Update Profile",
    path: "update-profile",
    element: <UpdateProduct />,
  },
];
