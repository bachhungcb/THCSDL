import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Select, Button, Form, Input } from "antd";
import "./SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const { Option } = Select;

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const [userChoice, setUserChoice] = useState("names");
  const navigation = useNavigate();

  const handleSearch = () => {
    onSearch(searchValue, userChoice);
    navigation.push("/search-results");
  };

  return (
    <div className="searching-bar">
      <Form layout="inline">
        <Form.Item>
          <Input
            placeholder="What are you looking for?"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
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
          <Button type="primary" onClick={handleSearch}>
          <FontAwesomeIcon icon={fas.faMagnifyingGlass} />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SearchBar;
