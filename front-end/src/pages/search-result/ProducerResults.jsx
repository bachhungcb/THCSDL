import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table, Divider } from "antd";
import "./SearchResult.css";

function ProducerResults({ userChoice, searchValue }) {
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
      title: 'Producer ID',
      dataIndex: 'producers_id',
      key: 'producers_id',
    },
    {
      title: 'Producer Name',
      dataIndex: 'producers_name',
      key: 'producers_name',
      render: (text, record) => (
        <Link to={`/producer/${record.producers_id}`}>
          {text}
        </Link>
      ),
    },
  ];

  return (
    <>
      <Divider orientation="left">Search Results for "{searchValue}"</Divider>
      <Table
        columns={columns}
        dataSource={searchData}
        rowKey="producers_id"
      />
    </>
  );
}

export default ProducerResults;
