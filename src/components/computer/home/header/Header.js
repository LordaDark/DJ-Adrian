import React, { useState, useEffect } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.jpg';

const Header = () => {
  const [isMiniHeader, setIsMiniHeader] = useState(false);

  // Funzione per gestire lo scroll
  const handleScroll = () => {
    if (window.scrollY > 100) { 
      setIsMiniHeader(true);
    } else {
      setIsMiniHeader(false);
    }
  };

  // Aggiungi e rimuovi l'event listener per lo scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isMiniHeader ? 'mini-header' : ''}`}>
      <div className="left">
        <div className="logoimg">
          <img src={logo} alt="Logo DJ Adrian" />
        </div>
        {!isMiniHeader && (
          <div className="logo">
            <a href="/">DJ Adrian</a>
          </div>
        )}
      </div>
      <div className="right">
        {isMiniHeader ? (
          <div className="menu-icon" onClick={() => setIsMiniHeader(false)}>
            &#9776; {/* Icona menu */}
          </div>
        ) : (
          <nav>
            <ul className="nav-links">
              <li><a href="#title">Home</a></li>
              <li><a href="#eventi">Eventi</a></li>
              <li><a href="#service">Servizi</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
