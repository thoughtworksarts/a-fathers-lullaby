import React from 'react'
import { NavLink as NavLinkRR } from 'react-router-dom'

const NavLink = ({ title, link }) => {
  return (
    <NavLinkRR to={link} exact activeClassName='selected' className='Link'>
      {title}
    </NavLinkRR>
  )
}

export default NavLink
