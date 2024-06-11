import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; 
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status from local storage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isReloaded');
    // Update authentication status
    setIsAuthenticated(false);
    // Redirect to login page
    navigate('/');
    window.location.reload();
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link className='title' to='/'>
        Cineplex
      </Link>

      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? 'open' : ''}>
        {isAuthenticated && (
          <li>
            <button className='navButtons bg-green-400 rounded-md mt-5 mx-3'>
              <NavLink to='/list'>Create List</NavLink>
            </button>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button 
              className='navButtons bg-green-400 rounded-md mt-5 py-2 px-2 mr-3' 
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

