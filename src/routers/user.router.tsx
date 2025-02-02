import GetMyOrder from "../pages/dashboard/user/getMyOrders/GetMyOrder";
import Profile from "../pages/dashboard/user/Profile";
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
    element: <GetMyOrder />,
  },
  {
    name: "Update Profile",
    path: "update-profile",
    element: <Profile />,
  },
];
