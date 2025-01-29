
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
  const role = "admin";
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
    <Sider
      breakpoint="lg" 
      collapsedWidth="0"
    >
      <div className="demo-logo-vertical text-white font-bold text-2xl flex items-center justify-center py-4">
        Car Store
      </div>
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
