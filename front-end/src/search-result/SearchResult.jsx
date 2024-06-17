import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation } from "react-router-dom";
import AnimeResults from "./AnimeResults";
import ProducerResults from "./ProducerResults";
import CharacterResults from "./CharacterResults";
import MainLayout from "../templates/MainLayout";
import "./SearchResult.css";
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
      <MainLayout>
          <br></br>
          <h1>No search results found</h1>
      </MainLayout>
    );
  } else
    switch (userChoice) {
      case "names":
        return <AnimeResults userChoice={userChoice} searchValue={searchValue} />;
      case "genres":
        return <AnimeResults userChoice={userChoice} searchValue={searchValue} />;
      case "producers_names":
        return <ProducerResults userChoice={userChoice} searchValue={searchValue} />;
      case "characters_names":
        return <CharacterResults userChoice={userChoice} searchValue={searchValue} />;
    }
}

export default SearchResult;
