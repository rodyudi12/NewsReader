import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import {useAuth} from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { savedArticles, getUserSavedArticles} = useArticles();
  const { user, logout, isAuthenticated } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/')
  }

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>
            {isAuthenticated && (
            <Link 
              to="/saved" 
              className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
            >
               Saved Articles ({getUserSavedArticles().length})
            </Link>
            )}
          </div>
        </div>
        
        <div className="nav-user">
          {isAuthenticated ? (
            <div style={{ display : 'flex', alignItems: 'center', gap: '12px'}}>
              <span>{user.username}</span>
              {user.role === 'admin' && (
                <Link to="/admin" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                  Admin
                </Link>
              )}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;