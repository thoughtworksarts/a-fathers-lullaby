import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo-small.png';

const Menu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <nav>
      <img src={logo} alt="A Father's Lullaby" />
      {
        isMobile ?
          null
        :
          <ul>
            <li><a href="/">About</a></li>
            <li><a href="/">Share a Lullaby</a></li>
            <li><a href="/">Listen to Others</a></li>
          </ul>
      }
    </nav>
  );
}

export default Menu;
