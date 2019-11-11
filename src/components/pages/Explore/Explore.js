import React from 'react'
import { MapContainer } from '../../organisms'
import './Explore.css'

const Explore = () => {
  return (
    <div className='ExplorePage'>
      <div className='MapView'>
        <MapContainer />
      </div>
    </div>
  )
}

export default Explore
