import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table, Avatar } from "antd";
import MainLayout from "../templates/MainLayout.jsx";
import { useTitle } from "../templates/TitleContext.jsx";
import "./SearchResult.css";

function CharacterResults({ userChoice, searchValue }) {
  const setTitle = useTitle();
  const location = useLocation();
  const path = location.pathname.split("/");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
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

  const columns = [
    {
      title: "Profile",
      dataIndex: "Profile",
      key: "Profile",
      render: (text) => <Avatar src={text} />,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (text, record) => (
        <Link
          to={`/character/${record.Id}`}
          onClick={() => setTitle(record.Name)}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Roles",
      dataIndex: "Roles",
      key: "Roles",
    },
  ];

  return (
    <MainLayout breadcrumbs={["Home", "Search Results"]}>
      <div className="searchheader">Search Results for "{searchValue}"</div>
      <Table
        columns={columns}
        dataSource={searchData}
        rowKey="Id"
        pagination={false}
      />
    </MainLayout>
  );
}

export default CharacterResults;
