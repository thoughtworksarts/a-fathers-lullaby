import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { withTracking } from 'helpers'

const Link = ({ children, onClickWithTracking, onClick, gaTrack = true, ...rest }) => {
  return (
    <LinkRouter onClick={gaTrack ? onClickWithTracking('Link') : onClick} {...rest}>
      {children}
    </LinkRouter>
  )
}

export default withTracking(Link)
