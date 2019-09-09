import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
      <Link to='/'><Logo size='sm' /></Link>
      {
        isMobile
          // <i className="fas fa-bars"></i>
          ? <img className='menu-bars' src={menuBars} alt='Menu' />
          : (
            <ul>
              <Link to='/' className='selected'>
                <li>About</li>
              </Link>
              <Link to='/share'>
                <li>Share a Lullaby</li>
              </Link>
              <Link to='/listen'>
                <li>Listen to Others</li>
              </Link>
            </ul>
          )
      }
    </nav>
  )
}

export default Header
