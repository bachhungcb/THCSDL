import './NavBar.css';
import SearchBar from "../search-bar/SearchBar";
function NavBar() {
return(
    <nav className='nav-bar'>
        <ul className='menu'>
            <li><a href="#">All Anime</a></li>
            <li><a href="#">Top movie</a></li>
            <li><a href="#">Top OVA</a></li>
            <li><a href="#">Top TV Series</a></li>
            <li><a href="#">Character</a></li>
        </ul>
        <SearchBar />
    </nav>
)
}

export default NavBar;