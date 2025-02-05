import GetMyOrder from "../pages/dashboard/user/getMyOrders/GetMyOrder";
import Profile from "../pages/dashboard/user/profile/Profile";
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
    name: "Profile",
    path: "profile",
    element: <Profile />,
  },
];
