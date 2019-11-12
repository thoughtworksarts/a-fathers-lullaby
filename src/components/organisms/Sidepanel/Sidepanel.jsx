import React from 'react'
import { NavLink } from 'atoms'
import './Sidepanel.css'

const Sidepanel = (props) => {
  let panelClasses = ['side-panel']

  if (props.show) {
    panelClasses = ['side-panel', 'open']
  }

  return (
    <div className={panelClasses.join(' ')}>
      <NavLink className='firstLink' link='/'>About</NavLink>
      <NavLink link='/share'>Share</NavLink>
      <NavLink link='/explore'>Explore</NavLink>
      <NavLink link='/library'>Library</NavLink>
    </div>
  )
}

export default Sidepanel
