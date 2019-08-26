import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo-small.png';
import './Menu.css';

const Menu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <nav className="Menu">
      <a href="/"><img src={logo} alt="A Father's Lullaby" /></a>
      {
        isMobile ?
          <i className="fas fa-bars"></i>
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

export default Menu;
