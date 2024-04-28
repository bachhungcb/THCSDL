import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";
import { Select } from "antd";


function SearchBar() {
  const urlWithProxy = "http://localhost:8080/animes";
  const [search, setSearch] = useState("");
  const [userChoice, setUserChoice] = useState("names"); // Khởi tạo giá trị userChoice mặc định

  function handleGoButtonClick() {
    if (search.trim() !== "") {
      axios
        .get(`${urlWithProxy}/${userChoice}/${search}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className="searching-bar">
      <form onSubmit={(e) => {e.preventDefault(); handleGoButtonClick();}}>
        <input type="text" placeholder="Search Anime" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        {/* Ẩn nút "Go" và chuyển hành động khi submit form sang hàm handleGoButtonClick */}
        <button type="submit" style={{ display: "none" }}>Go</button>
      </form>
      <div>
        {/* Sử dụng dropdown thay vì các nút radio */}
        <Select value={userChoice} onChange={(e) => setUserChoice(e.target.value)}>
          <Select.Option value="names">Anime</Select.Option>
          <Select.Option value="genres">Genres</Select.Option>
          <Select.Option value="producers_names">Producer</Select.Option>
          <Select.Option value="characters_names">Character</Select.Option>
        </Select>
      </div>
      <div>
        {/* Hiển thị nút "Go" và gọi hàm handleGoButtonClick khi nhấn */}
        <button onClick={handleGoButtonClick}>Go</button>
      </div>
    </div>
  );
}

export default SearchBar;
