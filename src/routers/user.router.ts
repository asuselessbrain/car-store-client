import UpdateProduct from "../pages/dashboard/admin/UpdateProduct";
import Orders from "../pages/dashboard/user/Orders";

export const userRouterPath = [
    {
        name: "Dashboard",
        path: "orders",
        Component: Orders
    },
    {
        name: "Update Profile",
        path: "update-profile",
        Component: UpdateProduct
    }
]