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
    </nav>
)
}

export default NavBar;