import { Outlet } from "react-router";
import Header from "../components/Header";
import { Layout } from "antd";

export default function MainLayout() {
  const { Content, Footer } = Layout;

  return (
    <Layout
      style={{
        maxWidth: "100vw",
        overflowX: "hidden",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Content style={{ margin: "16px" }} >
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          <Outlet />
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          position: "absolute",
          bottom: "-10%",
          width: "100%",
        }}
      >
        Ant Design Layout with React Router ©2024 Created by Nhả
      </Footer>
    </Layout>
  );
}
