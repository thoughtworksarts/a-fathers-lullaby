import React, { useEffect, useState } from 'react'
import { NavLink } from 'atoms'
import './Sidepanel.css'

const Sidepanel = (props) => {
  const [panelClass, setPanelClass] = useState('panel')
  const [isOpen, setIsOpen] = useState(props.isOpen)

  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [props.isOpen])

  useEffect(() => {
    if (props.isOpen) {
      setPanelClass('panel open')
    } else {
      setPanelClass('panel')
    }
  }, [props.isOpen])

  const menuClickHandler = () => {
    props.backdropClickHandler(!isOpen)
    setIsOpen(!isOpen)
  }

  return (
    <div className={panelClass} onClick={() => menuClickHandler()}>
      <NavLink className='firstLink' link='/'>About</NavLink>
      <NavLink link='/share'>Share</NavLink>
      <NavLink link='/explore'>Explore</NavLink>
    </div>
  )
}

export default Sidepanel
