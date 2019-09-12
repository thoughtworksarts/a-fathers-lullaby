import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import menuBars from 'assets/menu-bars.svg'
import { Logo, NavLink } from 'atoms'

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
              <NavLink title='About' link='/' />
              <NavLink title='Share a Lullaby' link='/share' />
              <NavLink title='Listen to Others' link='/listen' />
            </div>
          )
      }
    </nav>
  )
}

export default Header
