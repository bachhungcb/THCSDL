import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import "./NavBar.css";
import SearchBar from "../search-bar/SearchBar";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const handleNavLinkClick = (event, path) => {
    const userID = sessionStorage.getItem("userID");
    if (!userID) {
      event.preventDefault();
      message.error("You must be logged in to access this page.");
      return;
    }
    navigate(path);
  };

  return (
    <nav className="nav-bar">
      <ul className="menu">
        <li className={pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={pathname === "/top-anime-series" ? "active" : ""}>
          <Link to="/top-anime-series" onClick={(event) => handleNavLinkClick(event, "/top-anime-series")}>
            All Anime
          </Link>
        </li>
        <li className={pathname === "/top-type/Movie" ? "active" : ""}>
          <Link to="/top-type/Movie" onClick={(event) => handleNavLinkClick(event, "/top-type/Movie")}>
            Top Movie
          </Link>
        </li>
        <li className={pathname === "/top-type/OVA" ? "active" : ""}>
          <Link to="/top-type/OVA" onClick={(event) => handleNavLinkClick(event, "/top-type/OVA")}>
            Top OVA
          </Link>
        </li>
        <li className={pathname === "/top-type/TV" ? "active" : ""}>
          <Link to="/top-type/TV" onClick={(event) => handleNavLinkClick(event, "/top-type/TV")}>
            Top TV Series
          </Link>
        </li>
        <li className={pathname === "/characters" ? "active" : ""}>
          <Link to="/characters" onClick={(event) => handleNavLinkClick(event, "/characters")}>
            Character
          </Link>
        </li>
      </ul>

      <SearchBar />
    </nav>
  );
}

export default NavBar;
