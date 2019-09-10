import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import menuBars from 'assets/menu-bars.svg'
import { Logo, NavItem } from 'atoms'

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
            <ul>
              <NavItem title='About' link='/' />
              <NavItem title='Share a Lullaby' link='/share' />
              <NavItem title='Listen to Others' link='/listen' />
            </ul>
          )
      }
    </nav>
  )
}

export default Header
