import React from 'react'
import { Link } from 'atoms'
import './Button.css'

export const Button = (props) => {
  return (
    <Link to={props.to}>
      <button className='Button'>
        {props.children}
      </button>
    </Link>
  )
}

export default Button
