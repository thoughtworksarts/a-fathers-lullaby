import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { withTracking } from 'helpers'

export const Link = ({ to, children, onClickWithTracking, onClick, gaTrack = true }) => {
  return (
    <LinkRouter to={to} onClick={gaTrack ? onClickWithTracking('Link') : onClick}>
      {children}
    </LinkRouter>
  )
}

export default withTracking(Link)
