import React from 'react'
import SearchBar from './search-bar/SearchBar.jsx'
import AnimeTable from './anime-table/AnimeTable.jsx'
import './App.css'

function App() {
    return (
        <div className="App">
        <SearchBar />
        <AnimeTable />
        </div>
    )
}

export default App