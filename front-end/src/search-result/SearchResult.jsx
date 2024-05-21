import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation } from "react-router-dom";
import AnimeResults from "./AnimeResults";
import ProducerResults from "./ProducerResults";
import CharacterResults from "./CharacterResults";
import NavBar from "../nav-bar/NavBar";
const { Header, Content, Footer } = Layout;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function SearchResult() {
  const query = useQuery();
  const userChoice = query.get("userChoice");
  const searchValue = query.get("searchValue");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
        return <ProducerResults userChoice={userChoice} searchValue={searchValue} />;
      case "characters_names":
        return <CharacterResults characters={searchValue} />;
    }
}

export default SearchResult;
