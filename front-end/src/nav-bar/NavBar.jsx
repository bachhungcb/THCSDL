import './NavBar.css';
import SearchBar from "../search-bar/SearchBar";
import { Link } from 'react-router-dom';
function NavBar() {
return(
    <nav className='nav-bar'>
        <ul className='menu'>
            <li><Link to="/top-anime-series">All Anime</Link></li>
            <li><Link to="/top-type/Movie">Top movie</Link></li>
            <li><Link to="/top-type/OVA">Top OVA</Link></li>
            <li><Link to="/top-type/TV">Top TV Series</Link></li>
            <li><Link to="/characters">Character</Link></li>
        </ul>
        <SearchBar />
    </nav>
)
}

export default NavBar;