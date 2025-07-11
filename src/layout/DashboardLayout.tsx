import { Layout } from "antd";
import { Outlet } from "react-router";
import SideBar from "./SideBar";

const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <SideBar />
      <Layout className="dark:bg-gray-800">
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
