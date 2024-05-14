import React from "react";
import { Layout, Breadcrumb } from "antd";
import NavBar from "../nav-bar/NavBar";
import "./MainLayout.css"; // Tạo file CSS để tùy chỉnh giao diện nếu cần

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ children, breadcrumbs }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <NavBar />
      </Header>
      <Layout>
        {breadcrumbs && (
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbs.map((breadcrumb, index) => (
              <Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">{children}</div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Anime Database ©2024 Created by Bach Dam, Phuong Do, Khai Le and Tuan Nguyen
      </Footer>
    </Layout>
  );
};

export default MainLayout;
