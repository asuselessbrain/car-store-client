import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import ViewDetails from "../pages/viewDetails/ViewDetails";

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
                path: "/products",
                Component: Products
            },
            {
                path: "/view-details/:id",
                Component: ViewDetails
            }
        ]
    }
])