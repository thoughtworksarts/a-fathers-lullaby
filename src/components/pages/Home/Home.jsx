import React from 'react'
import './Home.css'

import { Footer } from 'molecules'
import { Timeline } from 'organisms'

const Home = () => {
  return (
    <div className='HomePage'>
      <Timeline />

      <Footer />
    </div>
  )
}

export default Home
