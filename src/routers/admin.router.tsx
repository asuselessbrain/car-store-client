import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import CreateProduct from "../pages/dashboard/admin/createProduct/CreateProduct";
import GetAllProducts from "../pages/dashboard/admin/getAllProduct/GetAllProducts";
import GetAllUser from "../pages/dashboard/admin/getAllUser/GetAllUser";
import UpdateProduct from "../pages/dashboard/admin/updateProducts/UpdateProduct";

export const AdminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Users",
    path: "get-all-user",
    element: <GetAllUser />,
  },
  {
    name: "Products",
    path: "get-all-products",
    element: <GetAllProducts />,
  },
  {
    name: "Create Product",
    path: "create-product",
    element: <CreateProduct />,
  },
  {
    name: "Update Product",
    path: "update-product/:id", // Dynamic route for product ID
    element: <UpdateProduct />,
  },
];
