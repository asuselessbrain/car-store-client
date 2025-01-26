import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";

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
            }
        ]
    }
])