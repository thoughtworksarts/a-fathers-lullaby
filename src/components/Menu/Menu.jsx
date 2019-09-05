import React, { useState, useEffect } from 'react'
import logo from '../../assets/logo-small.png'
import menuBars from '../../assets/menu-bars.svg'
import './Menu.css'

const Menu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <nav className='Menu'>
      <a href='/'><img className='logo' src={logo} alt="A Father's Lullaby" /></a>
      {
        // <i className="fas fa-bars"></i>
        isMobile
          ? <img className='menu-bars' src={menuBars} alt='Menu' />
          : <ul>
            <li><a href='/' className='selected'>About</a></li>
            <li><a href='/'>Share a Lullaby</a></li>
            <li><a href='/'>Listen to Others</a></li>
          </ul>
      }
    </nav>
  )
}

export default Menu
