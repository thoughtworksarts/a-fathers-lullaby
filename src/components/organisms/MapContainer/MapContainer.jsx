import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import './MapContainer.css'

class MapExample extends Component {
  render () {
    require('env2')('.env.local')
    console.log(process.env.GOOGLE_MAPS_API_KEY)
    return (
      <Map
        google={this.props.google}
        zoom={11.5}
        className='Map'
        initialCenter={{ lat: 42.3601, lng: -70.85 }}
      />
    )
  }
}

export default GoogleApiWrapper({

  apiKey: `${process.env.GOOGLE_MAPS_API_KEY}`
})(MapExample)
