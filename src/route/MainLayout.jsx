import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import React from 'react';
import useAuth from '../hooks/use-auth';
import { useEffect, useState } from 'react';
import { useSearch } from '../hooks/use-seach';

function MainLayout() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { searchValue, setSearchValue } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (searchValue.trim()) {
        newParams.set('search', searchValue.trim());
      } else {
        newParams.delete('search');
      }
      setSearchParams(newParams);
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, searchParams, setSearchParams]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <h1><Link to="/" className="header-title">Community Forum</Link></h1>

          {/* Show login/profile always on the right */}
          <div className="header-right">
            <div className="header-menu desktop">
              <nav className="header-nav">
                <ul className="nav-links">
                  <li onClick={() => navigate('/')}>Thread</li>
                  <li onClick={() => navigate('/leaderboard')}>LeaderBoard</li>
                </ul>
              </nav>

              <div className="header-actions">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-controls">
              {user ? (
                <div className="profile-wrapper">
                  <div className="profile-badge" onClick={() => setShowDropdown((prev) => !prev)}>
                    {user.name.charAt(0).toUpperCase()}</div>
                  {showDropdown && (
                    <div className="profile-dropdown">
                      <p>{user.name}</p>
                      <button onClick={logout}>Log Out</button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="login-btn" onClick={() => navigate('/login')}>Log In</button>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button className="menu-toggle" onClick={() =>  setShowMenu((prev) => !prev)}>☰</button>
          </div>
        </div>

        {/* Collapsible menu for mobile */}
        <div className={`header-menu mobile ${showMenu ? 'show' : ''}`}>
          <nav className="header-nav">
            <ul className="nav-links">
              <li onClick={() => { navigate('/'); setShowMenu(false); }}>Thread</li>
              <li onClick={() => { navigate('/leaderboard'); setShowMenu(false); }}>LeaderBoard</li>
            </ul>
          </nav>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Community Forum. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
