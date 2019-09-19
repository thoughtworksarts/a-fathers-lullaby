import React from 'react'
import { useOnClickWithTracking } from 'helpers'
import { NavLink as NavLinkRR } from 'react-router-dom'

export const NavLink = (props) => {
  const onClick = useOnClickWithTracking(props, 'NavLink')

  return (
    <NavLinkRR
      exact
      to={props.link}
      activeClassName='selected'
      className='Link'
      onClick={onClick}
    >
      {props.children}
    </NavLinkRR>
  )
}

export default NavLink
