import React from 'react'
import { withTracking } from 'helpers'

const Button = ({ children, onClickButtonWithTracking, onClick, gaTrack = true, ...rest }) => {
  return (
    <button onClick={gaTrack ? onClickButtonWithTracking : onClick} {...rest}>
      {children}
    </button>
  )
}

export default withTracking(Button)
