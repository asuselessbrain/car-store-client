import { Link } from "react-router";
import { user } from "../redux/fetchers/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { AdminPath } from "../routers/admin.router";
import { userRouterPath } from "../routers/user.router";
import { sideBarGenerator } from "../utils/sideBarGenerator";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const userRole = {
  Admin: "admin",
  User: "user",
};

const SideBar = () => {
  const currentUser = useAppSelector(user);

  const role = currentUser?.role;

  let sidebarItems;

  switch (role) {
    case userRole.Admin:
      sidebarItems = sideBarGenerator(AdminPath, "admin");
      break;
    case userRole.User:
      sidebarItems = sideBarGenerator(userRouterPath, "user");
      break;
    default:
      return null; // Return null if invalid role is provided.
  }
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <Link to="/">
        <div className="demo-logo-vertical text-white font-bold text-2xl flex items-center justify-center py-4">
          AutoSphere
        </div>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
