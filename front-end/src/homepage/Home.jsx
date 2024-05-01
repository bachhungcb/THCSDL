import React from 'react'
import NavBar from '../nav-bar/NavBar.jsx'
import AnimeTable from '../anime-table/AnimeTable.jsx'

function Home(){
    return (
        <div className="App">
            <div className="navbar-container"><NavBar /></div>
            <div className="anime-table-container"><AnimeTable /></div>
        </div>
    )
}

export default Home