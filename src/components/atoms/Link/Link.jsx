import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { withTracking } from 'helpers'

const Link = ({ children, onClickButtonWithTracking, onClick, gaTrack = true, ...rest }) => {
  return (
    <LinkRouter onClick={gaTrack ? onClickButtonWithTracking : onClick} {...rest}>
      {children}
    </LinkRouter>
  )
}

export default withTracking(Link)
