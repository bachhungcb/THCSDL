import React, { useState } from "react";
import axios from "axios";
import SearchResult from "../search-result/SearchResult.jsx"; 
import { Select, Button, Form, Input } from "antd";
import "./SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const { Option } = Select;

function SearchBar() {
  const urlWithProxy = "http://localhost:8080/animes";
  const [form] = Form.useForm();
  const [userChoice, setUserChoice] = useState("names");
  const [searchData, setSearchData] = useState([]);
  
  const handleGoButtonClick = () => {
    form.validateFields().then((values) => {
      const { search } = values;
      if (search.trim() !== "") {
        axios
          .get(`${urlWithProxy}/${userChoice}/${search}`)
          .then((res) => {
            console.log(res.data);
            setSearchData(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  return (
    <div className="searching-bar">
      <Form form={form} layout="inline" onFinish={handleGoButtonClick}>
        <Form.Item name="search" rules={[{ required: true, message: 'Please input your search!' }]}>
          <Input placeholder="What are you looking for?" />
        </Form.Item>
        <Form.Item>
          <Select value={userChoice} onChange={(value) => setUserChoice(value)}>
            <Option value="names">Anime</Option>
            <Option value="genres">Genres</Option>
            <Option value="producers_names">Producer</Option>
            <Option value="characters_names">Character</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
          <FontAwesomeIcon icon={fas.faMagnifyingGlass} />
          </Button>
        </Form.Item>
      </Form>
      <SearchResult userChoice = {userChoice} results={searchData} />
    </div>
  );
}

export default SearchBar;
