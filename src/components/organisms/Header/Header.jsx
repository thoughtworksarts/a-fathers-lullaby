import React, { useState, useEffect } from 'react'
import menuBars from 'assets/menu-bars.svg'
import { Logo, Link, Subtitle, NavLink, Backdrop } from 'atoms'
import { Sidepanel } from 'organisms'
import mobileLogo from 'assets/mobileLogo.png'

import './Header.css'

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

  const backdropClickHandler = (updateIsOpen) => {
    setIsOpen(updateIsOpen)
  }

  const createMobileHeader = () => {
    return (
      <div className='mobile-header'>
        <div className='mobile-first-line'>
          <div className='mobile-logo'>
            <Link to='/'>
              <img src={mobileLogo} alt='mobile AFL logo' />
            </Link>
          </div>
          <div className='sideMenu'>
            <img
              className='menu-bars'
              src={menuBars}
              alt='Menu'
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
        <div className='mobile-second-line'>
          <p>
            A <span className='highlight-red'>poetic movement</span> for social justice.
          </p>
        </div>
      </div>
    )
  }

  const createDesktopHeader = () => {
    return (
      <div className='desktop-header'>
        <div className='logoText'>
          <Link to='/'>
            <Logo size='sm' />
          </Link>
          <Subtitle />
        </div>
        <div className='NavBar NavLinks'>
          <NavLink className='headerLinks' link='/'>
            About
          </NavLink>
          <NavLink link='/share'>Share</NavLink>
          <NavLink link='/explore'>Explore</NavLink>
        </div>
      </div>
    )
  }

  return (
    <div>
      <nav className='Header'>
        {isMobile ? createMobileHeader() : createDesktopHeader()}
      </nav>
      <Sidepanel isOpen={isOpen} backdropClickHandler={backdropClickHandler} />
      <Backdrop alt='Backdrop' isOpen={isOpen} backdropClickHandler={backdropClickHandler} />
    </div>
  )
}

export default Header
