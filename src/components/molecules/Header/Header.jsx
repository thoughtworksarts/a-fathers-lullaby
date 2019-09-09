import React, { useState, useEffect } from 'react'
import './Header.css'
import menuBars from 'assets/menu-bars.svg'
import { Logo } from 'atoms'

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <nav className='Header'>
      <Logo size='sm' />
      {
        isMobile
          // <i className="fas fa-bars"></i>
          ? <img className='menu-bars' src={menuBars} alt='Menu' />
          : (
            <ul>
              <li><a href='/' className='selected'>About</a></li>
              <li><a href='/'>Share a Lullaby</a></li>
              <li><a href='/'>Listen to Others</a></li>
            </ul>
          )
      }
    </nav>
  )
}

export default Header
