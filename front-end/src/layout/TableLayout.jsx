// CustomLayout.js
import React from "react";
import { Layout, Breadcrumb } from "antd";
import NavBar from "./NavBar"; // Import NavBar component

const { Header, Content, Sider } = Layout;

const CustomLayout = ({ anime, children }) => {
  return (
    <Layout>
      <Header className="header">
        <NavBar />
        <br />
      </Header>
      <Content className="content">
        <Breadcrumb className="breadcrumb" separator=">">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Top Anime Series</Breadcrumb.Item>
          <Breadcrumb.Item>{anime.title}</Breadcrumb.Item>
        </Breadcrumb>
        <br />
      </Content>
      <Layout>
        <Sider background-color="#f5f5f5">
          {children[0]} 
        </Sider>
        <Content>
          {children[1]} 
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
