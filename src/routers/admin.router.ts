import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import CreateProduct from "../pages/dashboard/admin/CreateProduct";
import GetAllProducts from "../pages/dashboard/admin/GetAllProducts";
import GetAllUser from "../pages/dashboard/admin/GetAllUser";
import UpdateProduct from "../pages/dashboard/admin/UpdateProduct";



export const AdminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    Component: AdminDashboard,
  },
  {
    name: "Users",
    path: "get-all-user",
    Component: GetAllUser,
  },
  {
    name: "Products",
    path: "get-all-products",
    Component: GetAllProducts,
  },
  {
    name: "Create Product",
    path: "create-product",
    Component: CreateProduct,
  },
  {
    name: "Update Product",
    path: "update-product",
    Component: UpdateProduct,
  },
];




