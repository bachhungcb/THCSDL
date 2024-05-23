import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTitle } from "./TitleContext";
const pathNameMapping = {
  "top-anime-series": "Top Anime Series",
  "search-results": "Search Results",
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

  pathSnippets.forEach((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    let breadcrumbLabel = pathSnippets[index].replace(/-/g, " ");

    if (pathSnippets[index] in pathNameMapping) {
      breadcrumbLabel = pathNameMapping[pathSnippets[index]];
    } else if (params.animeId && index === pathSnippets.length - 1) {
      breadcrumbLabel = title;
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