import './NavBar.css';

function NavBar() {
  useEffect(() => {
    getDataFromServer();
  }, []); // run only once when the component mounts

return(
    <nav className='nav-bar'>
        <ul className='menu'>
            <li><a href="#">Cak</a></li>
            <li><a href="#">Cak</a></li>
            <li><a href="#">Cak</a></li>
            <li><a href="#">Cak</a></li>
            <li><a href="#">Cak</a></li>
        </ul>
        <div className='searching-bar'>
            <form action="#">
                <input type="text" placeholder="Search Anime" name="search"/>
                <button type='submit'>
                    Go
                </button>
            </form>
        </div>
    </nav>
)
}

export default NavBar;