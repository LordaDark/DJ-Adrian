import React, { useState } from 'react';
import './header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Pallina con menu */}
      <div className="blue-ball" onClick={() => setMenuOpen(true)}>
        <div className="menu-icon-mobile">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>

      {/* Menu a schermo intero */}
      {menuOpen && (
        <div className="full-screen-menu">
          <ul className="menu-list">
            <li><a href="#title">Home</a></li>
            <li><a href="#eventi">Eventi</a></li>
            <li><a href="#service">Servizi</a></li>
            <li className="close-menu" onClick={() => setMenuOpen(false)}>Chiudi</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
