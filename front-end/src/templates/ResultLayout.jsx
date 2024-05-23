import React from "react";
import { Layout } from "antd";
import NavBar from "../nav-bar/NavBar";
import CustomBreadCrumbs from "./BreadCrumbs.jsx"

const { Header, Content, Footer} = Layout;
function ResultLayout({children, breadcrumbs}) {
    return(
        <Layout style={{ minHeight: "100vh" }}>
            <Header className="header">
                <NavBar />
            </Header>
            <Layout>
                {breadcrumbs && (
                    <CustomBreadCrumbs  breadcrumbs ={breadcrumbs}/>
                )}
                <Content style={{ padding: "0 50px" }}>
                    <div className="site-layout-content">{children}</div>
                </Content>
            </Layout>
            <Footer style={{ textAlign: "center" }}>
                Anime Database ©2024 Created by Bach Dam, Phuong Do, Khai Le and Tuan Nguyen
            </Footer>
        </Layout>
    )
}

export default ResultLayout;