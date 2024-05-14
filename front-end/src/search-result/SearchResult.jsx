import { Breadcrumb, Layout, Menu, theme } from "antd";
import React from "react";
import AnimeResults from "./AnimeResults";
import ProducerResults from "./ProducerResults";
import CharacterResults from "./CharacterResults";
import NavBar from "../nav-bar/NavBar";
const { Header, Content, Footer } = Layout;

function SearchResult({ searchValue, userChoice }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    // Thực hiện tìm kiếm khi có sự thay đổi về giá trị tìm kiếm hoặc lựa chọn người dùng
    if (searchValue.trim() !== "") {
      axios
        .get(`http://localhost:8080/animes/${userChoice}/${searchValue}`)
        .then((res) => {
          setSearchData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchValue, userChoice]);
  if (searchValue === null) {
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
        return <AnimeResults results={searchValue} />;
      case "genres":
        return <AnimeResults results={searchValue} />;
      case "producers_names":
        return <ProducerResults producers={searchValue} />;
      case "characters_names":
        return <CharacterResults characters={searchValue} />;
    }
}

export default SearchResult;
