import React from 'react'
import ReactDOM from 'react-dom/client'
import AnimeTable from './AnimeTable.jsx'
import NavBar from './NavBar.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    {/* <AnimeTable /> */}
  </React.StrictMode>,
)