import React, { useState, useEffect } from 'react'
import './Header.css'
import menuBars from 'assets/menu-bars.svg'
import { Logo, Link, NavLink } from 'atoms'

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
          ? <img className='menu-bars' src={menuBars} alt='Menu' />
          : (
            <div className='NavLinks'>
              <NavLink link='/'>About</NavLink>
              <NavLink link='/share'>Share a Lullaby</NavLink>
              <NavLink link='/listen'>Listen to Others</NavLink>
            </div>
          )
      }
    </nav>
  )
}

export default Header
