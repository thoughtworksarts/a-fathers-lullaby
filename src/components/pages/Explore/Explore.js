import React from 'react'
import './Explore.css'

import { Button } from 'atoms'

const Explore = () => {
  return (
    <div className='ExplorePage'>
      <div className='MapView'>
        <h1>Click on the button to see a library of all recordings.</h1>
        <Button to='/library'>Library</Button>
      </div>
    </div>
  )
}

export default Explore