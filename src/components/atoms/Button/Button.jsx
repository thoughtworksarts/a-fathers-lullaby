import React from 'react'
import { withTracking } from 'helpers'

const Button = ({ children, onClickWithTracking, onClick, gaTrack = true, ...rest }) => {
  return (
    <button onClick={gaTrack ? onClickWithTracking('Button') : onClick} {...rest}>
      {children}
    </button>
  )
}

export default withTracking(Button)
