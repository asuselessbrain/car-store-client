import GetMyOrder from "../pages/dashboard/user/getMyOrders/GetMyOrder";
import UserProfile from "../pages/dashboard/user/profile/UseProfile";
import ShowReview from "../pages/dashboard/user/showReview/ShowRevie";
import UserDashboard from "../pages/dashboard/user/userDashboard/UserDashboard";

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
    element: <UserProfile />,
  },
  {
    name: "Review",
    path: "review",
    element: <ShowReview />,
  },
];
