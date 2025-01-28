import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import ViewDetails from "../pages/viewDetails/ViewDetails";
import Dashboard from "../pages/dashboard/Dashboard";
import { routerGenerator } from "../utils/routerGenerator";
import { AdminPath } from "./admin.router";
import { userRouterPath } from "./user.router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "products",
                Component: Products
            },
            {
                path: "view-details/:id",
                Component: ViewDetails
            }
        ]
    },
    {
        path: "/admin",
        Component: Dashboard,
        children: routerGenerator(AdminPath)
    },
    {
        path: "/user",
        Component: Dashboard,
        children: routerGenerator(userRouterPath)
    },
])