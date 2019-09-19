import React from 'react'
import { useOnClickWithTracking } from 'helpers'

export const Button = (props) => {
  const onClick = useOnClickWithTracking(props, 'Button')

  return (
    <button onClick={onClick}>
      {props.children}
    </button>
  )
}

export default Button
