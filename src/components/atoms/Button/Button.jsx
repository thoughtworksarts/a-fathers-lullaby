import React from 'react'
import { withTracking } from 'helpers'

export const Button = ({ children, onClickWithTracking, onClick, gaTrack = true }) => {
  console.log('onClickWithTracking', onClickWithTracking);
  
  return (
    <button onClick={gaTrack ? onClickWithTracking('Button') : onClick}>
      {children}
    </button>
  )
}

export default withTracking(Button)
