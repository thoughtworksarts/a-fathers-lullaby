import React, { useState, useEffect } from 'react'
import './Header.css'
import menuBars from 'assets/menu-bars.svg'
import { Logo, Link, Subtitle, NavLink, Backdrop } from 'atoms'

import { Sidepanel } from 'organisms'

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980)
      setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const backdropClickHandler = () => {
      setIsOpen(!isOpen)
    }
    const menu = document.getElementsByClassName('sideMenu')[0]
    if (menu) { menu.addEventListener('click', backdropClickHandler) }
  })

  return (
    <nav className='Header'>
      <div className='logoText'>
        <Link to='/'><Logo size='sm' /></Link>
        <Subtitle />
      </div>
      {
        isMobile

          ? (
            <div className='sideMenu'>
              <img className='menu-bars' src={menuBars} alt='Menu' onClick={() => setIsOpen(true)} />
              <Sidepanel show={isOpen} />
              <Backdrop alt='Backdrop' show={isOpen} />
            </div>

          )
          : (
            <div className='NavBar NavLinks'>
              <NavLink className='headerLinks' link='/'>About</NavLink>
              <NavLink link='/share'>Share</NavLink>
              <NavLink link='/listen'>Listen</NavLink>
            </div>

          )
      }
    </nav>
  )
}

export default Header
