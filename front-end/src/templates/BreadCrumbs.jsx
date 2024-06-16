import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTitle } from "./TitleContext";

const pathNameMapping = {
  "top-anime-series": "Top Anime Series",
  "search-results": "Search Results",
  "character": "Characters",
  "top-type": "Top Type",
};

function CustomBreadcrumbs() {
  const location = useLocation();
  const params = useParams();
  const { title } = useTitle();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ];

  pathSnippets.forEach((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    let breadcrumbLabel = snippet.replace(/-/g, " ");

    if (snippet in pathNameMapping) {
      breadcrumbLabel = pathNameMapping[snippet];
    } else if (params.animeId && index === pathSnippets.length - 1) {
      breadcrumbLabel = title;
    } else if (params.characterId && snippet === params.characterId) {
      breadcrumbLabel = title || params.characterId;
    }

    breadcrumbItems.push(
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbLabel}</Link>
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb>;
}

export default CustomBreadcrumbs;
