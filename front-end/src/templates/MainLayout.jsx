import React from "react";
import { Layout } from "antd";
import NavBar from "../shared/components/nav-bar/NavBar.jsx";
import CustomBreadCrumbs from "./BreadCrumbs.jsx";
import "./MainLayout.css";
import LoginButton from "../shared/components/button/LoginButton.jsx";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children, breadcrumbs }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="logincontainer">
          <LoginButton />
        </div>
        <div className="nav-bar">
          <NavBar />
        </div>
      </Header>
      <Layout className="layoutmain">
        {breadcrumbs && <CustomBreadCrumbs breadcrumbs={breadcrumbs} />}
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">{children}</div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Anime Database ©2024 Created by Bach Dam, Phuong Do, Khai Le and Tuan
        Nguyen
      </Footer>
    </Layout>
  );
};

export default MainLayout;
