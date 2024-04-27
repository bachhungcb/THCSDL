import React from "react";
import ReactDOM from "react-dom/client";

import AnimeTable from "./anime-table/AnimeTable.jsx";
import NavBar from "./navbar/NavBar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavBar />
    <AnimeTable />
  </React.StrictMode>
);
