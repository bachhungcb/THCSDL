import { Breadcrumb, Layout, Menu, theme } from "antd";
import React from "react";
import AnimeResults from "./AnimeResults";
import ProducerResults from "./ProducerResults";
import CharacterResults from "./CharacterResults";
import NavBar from "../nav-bar/NavBar";
const { Header, Content, Footer } = Layout;

function SearchResult({ userChoice, results }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  if (results === null) {
    return (
      <Layout>
        <Header className="header">
          <NavBar />
          <br></br>
        </Header>
        <Content className="content">
          <Breadcrumb className="breadcrumb" separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Top Anime Series</Breadcrumb.Item>
            <Breadcrumb.Item>Search</Breadcrumb.Item>
          </Breadcrumb>
          <br></br>
          <h1>No search results found</h1>
        </Content>
        <Layout>
          <Footer className="footer">Footer</Footer>
        </Layout>
      </Layout>
    );
  } else
    switch (userChoice) {
      case "names":
        return <AnimeResults results={results} />;
      case "genres":
        return <AnimeResults results={results} />;
      case "producers_names":
        return <ProducerResults producers={results} />;
      case "characters_names":
        return <CharacterResults characters={results} />;
    }
}

export default SearchResult;
