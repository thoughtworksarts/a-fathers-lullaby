import React, { useState, useEffect } from 'react'
import { NavLink } from 'atoms'
import menuBars from 'assets/menu-bars.svg'
import './Sidepanel.css'

const Sidepanel = (props) => {
  let panelClasses = ['side-panel']

  if (props.show) {
    panelClasses = ['side-panel', 'open']
  }

  return (
    <div className={panelClasses.join(' ')}>
      <NavLink className='firstLink' link='/'>About</NavLink>
      <NavLink link='/share'>Share a Lullaby</NavLink>
      <NavLink link='/listen'>Listen to Others</NavLink>
    </div>
  )
}

export default Sidepanel
