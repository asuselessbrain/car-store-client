import CreateProduct from "../pages/dashboard/admin/CreateProduct";
import GetAllProducts from "../pages/dashboard/admin/GetAllProducts";
import GetAllUser from "../pages/dashboard/admin/GetAllUser";
import UpdateProduct from "../pages/dashboard/admin/UpdateProduct";



export const AdminPath = [
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




