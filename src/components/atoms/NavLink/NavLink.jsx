import React from 'react'
import { withTracking } from 'helpers'
import { NavLink as NavLinkRR } from 'react-router-dom'

const NavLink = ({ children, link, onClick, onClickWithTracking, gaTrack = true }) => {
  return (
    <NavLinkRR
      exact
      to={link}
      activeClassName='selected'
      className='Link'
      onClick={gaTrack ? onClickWithTracking('NavLink') : onClick}
    >
      {children}
    </NavLinkRR>
  )
}

export default withTracking(NavLink)
