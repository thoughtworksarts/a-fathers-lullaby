import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ title, link }) => {
  return (
    <NavLink to={link} exact activeClassName='selected'>
      <li>{title}</li>
    </NavLink>
  )
}

export default NavItem
