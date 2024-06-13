import React from "react";
import { Layout } from "antd";
import NavBar from "../nav-bar/NavBar";
import CustomBreadCrumbs from "./BreadCrumbs.jsx";
import LoginButton from "../button/LoginButton.jsx";
import "./MainLayout.css";

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
