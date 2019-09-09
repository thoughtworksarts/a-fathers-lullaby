import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
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
              <NavLink to='/' exact activeClassName='selected'>
                <li>About</li>
              </NavLink>
              <NavLink to='/share' activeClassName='selected'>
                <li>Share a Lullaby</li>
              </NavLink>
              <NavLink to='/listen' activeClassName='selected'>
                <li>Listen to Others</li>
              </NavLink>
            </ul>
          )
      }
    </nav>
  )
}

export default Header
