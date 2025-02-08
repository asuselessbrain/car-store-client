import AdminDashboard from "../pages/dashboard/admin/adminDashboard/AdminDashboard";
import CreateAdmin from "../pages/dashboard/admin/createAdmin/CreateAdmin";
import CreateProduct from "../pages/dashboard/admin/createProduct/CreateProduct";
import GetAllOrder from "../pages/dashboard/admin/getAllOrders/GetAllOrder";
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
    name: "Products",
    path: "get-all-products",
    element: <GetAllProducts />,
  },
  {
    name: "Orders",
    path: "all-orders",
    element: <GetAllOrder />,
  },
  {
    name: "Users",
    path: "get-all-user",
    element: <GetAllUser />,
  },
  {
    name: "Create Product",
    path: "create-product",
    element: <CreateProduct />,
  },
  {
    name: "Create Admin",
    path: "create-admin",
    element: <CreateAdmin />,
  },
  {
    name: "Update Product",
    path: "update-product/:id",
    element: <UpdateProduct />,
  },
];
