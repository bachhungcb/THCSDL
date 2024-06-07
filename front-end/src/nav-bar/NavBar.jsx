import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import SearchBar from "../search-bar/SearchBar";
import LoginButton from "../login/LoginButton";

function NavBar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="nav-bar">
      <ul className="menu">
        <li className={pathname === "/top-anime-series" ? "active" : ""}>
          <Link to="/top-anime-series">All Anime</Link>
        </li>
        <li className={pathname === "/top-type/Movie" ? "active" : ""}>
          <Link to="/top-type/Movie">Top Movie</Link>
        </li>
        <li className={pathname === "/top-type/OVA" ? "active" : ""}>
          <Link to="/top-type/OVA">Top OVA</Link>
        </li>
        <li className={pathname === "/top-type/TV" ? "active" : ""}>
          <Link to="/top-type/TV">Top TV Series</Link>
        </li>
        <li className={pathname === "/characters" ? "active" : ""}>
          <Link to="/characters">Character</Link>
        </li>
      </ul>

      <SearchBar />
    </nav>
  );
}

export default NavBar;
