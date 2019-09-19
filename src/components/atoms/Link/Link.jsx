import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useOnClickWithTracking } from 'helpers'

export const Link = (props) => {
  const onClick = useOnClickWithTracking(props, 'Link')

  return (
    <LinkRouter to={props.to} onClick={onClick}>
      {props.children}
    </LinkRouter>
  )
}

export default Link
