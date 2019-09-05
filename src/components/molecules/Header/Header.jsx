import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from 'assets/logo-small.png';
import menuBars from 'assets/menu-bars.svg';

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <nav className="Header">
      <a href="/"><img className="logo" src={logo} alt="A Father's Lullaby" /></a>
      {
        isMobile ?
          // <i className="fas fa-bars"></i>
          <img className="menu-bars" src={menuBars} alt="Menu" />
        :
          <ul>
            <li><a href="/" className="selected">About</a></li>
            <li><a href="/">Share a Lullaby</a></li>
            <li><a href="/">Listen to Others</a></li>
          </ul>
      }
    </nav>
  );
}

export default Header;
