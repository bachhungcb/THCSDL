import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../nav-bar/NavBar";
import CustomBreadCrumbs from "./BreadCrumbs.jsx";
import "./MainLayout.css";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children, breadcrumbs }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu user đã đăng nhập từ localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {isLoggedIn ? (
            <>
              <Button type="primary" style={{ marginRight: 8 }} onClick={() => navigate("/profile")}>
                Profile
              </Button>
              <Button onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button className="loginbtn" type="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </div>
        <NavBar />
      </Header>
      <Layout>
        {breadcrumbs && (
          <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
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
