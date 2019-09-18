import React from 'react'
import { Button } from 'atoms'
import './Listen.css'

const Listen = () => {
  return (
    <div className='ListenPage'>
      <h1>Listen</h1>
      <Button onClick={() => console.log('did something')}>click me</Button>
    </div>
  )
}

export default Listen
