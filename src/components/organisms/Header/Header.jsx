import React, { useState, useEffect } from 'react'
import './Header.css'
import menuBars from 'assets/menu-bars.svg'
import { Logo, Link, NavLink, Subtitle, Backdrop } from 'atoms'
import { Sidepanel } from 'organisms'

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980)
  const [isOpen] = useState(false)

  const backdrop = <Backdrop alt='Backdrop' show={isOpen} />

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const backdropClickHandler = () => {
      setIsOpen(!isOpen)
    }
    window.addEventListener('click', backdropClickHandler)
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
            <div>
              <img className='menu-bars' src={menuBars} alt='Menu' onClick={() => setIsOpen(true)} />
              <Sidepanel show={isOpen} />
              {backdrop}
            </div>

          )
          : (
            <div className='NavLinks'>
              <NavLink link='/'>About</NavLink>
              <NavLink link='/share'>Share</NavLink>
              <NavLink link='/listen'>Listen</NavLink>
            </div>
          )
      }
    </nav>
  )
}

export default Header
