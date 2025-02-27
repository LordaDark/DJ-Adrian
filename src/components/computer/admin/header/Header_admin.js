import React, { useState, useEffect } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.jpg';

const HeaderDashboard = () => {
  const [isMiniHeader, setIsMiniHeader] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsMiniHeader(true);
    } else {
      setIsMiniHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header-dashboard ${isMiniHeader ? 'mini-header-dashboard' : ''}`}>
      <div className="left-dashboard">
        <div className="logoimg-dashboard">
          <img src={logo} alt="Dashboard Logo" />
        </div>
        {!isMiniHeader && (
          <div className="logo-dashboard">
            <a href="/admin">Dashboard</a>
          </div>
        )}
      </div>
      <div className="right-dashboard">
        {isMiniHeader ? (
          <div className="menu-icon-dashboard" onClick={() => setIsMiniHeader(false)}>
            &#9776;
          </div>
        ) : (
          <nav>
            <ul className="nav-links-dashboard">
              <li><a href="/admin">Home</a></li>
              <li><a href="/musica_admin">Musica</a></li>
              <li><a href="/eventiadmin">Eventi</a></li>
              <li><a href="/utenti">Utenti</a></li>
              <li><a href="/">Logout</a></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default HeaderDashboard;
