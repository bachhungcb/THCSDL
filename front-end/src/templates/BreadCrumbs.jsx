import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const pathNameMapping = {
  'top-anime-series': 'Top Anime Series',
};

function CustomBreadcrumbs() {
  const location = useLocation();
  const params = useParams();
  const [animeTitle, setAnimeTitle] = useState('');

  useEffect(() => {
    // Fetch anime title based on ID
    if (params.id) {
      axios.get(`http://localhost:8080/animes/${params.id}`)
        .then(response => {
          setAnimeTitle(response.data.title);
        })
        .catch(error => {
          console.error('Error fetching anime title:', error);
        });
    }
  }, [params.id]);

  const pathSnippets = location.pathname.split('/').filter(i => i);

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>
  ];

  pathSnippets.forEach((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    let breadcrumbLabel = pathSnippets[index].replace(/-/g, ' '); // Default breadcrumb label
    if (pathSnippets[index] === 'top-anime-series' && params) {
      breadcrumbLabel = animeTitle; // Use the fetched anime title as the breadcrumb label
    } else if (pathSnippets[index] in pathNameMapping) {
      breadcrumbLabel = pathNameMapping[pathSnippets[index]]; // Use custom mapping if available
    }
    breadcrumbItems.push(
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbLabel}</Link>
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb separator=">">
      {breadcrumbItems.map(item => item)}
    </Breadcrumb>
  );
};

export default CustomBreadcrumbs;
