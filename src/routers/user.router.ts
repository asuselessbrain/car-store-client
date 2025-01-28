import UpdateProduct from "../pages/dashboard/admin/UpdateProduct";
import Orders from "../pages/dashboard/user/Orders";
import UserDashboard from "../pages/dashboard/user/UserDashboard";

export const userRouterPath = [
    {
        name: "Dashboard",
        path: "dashboard",
        Component: UserDashboard
    },
    {
        name: "Orders",
        path: "order",
        Component: Orders
    },
    {
        name: "Update Profile",
        path: "update-profile",
        Component: UpdateProduct
    }
]