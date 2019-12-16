import React, { useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import './ShareLocation.css'

const ShareLocation = (props) => {
  const [locationMarker, setLocationMarker] = useState(null)
  
  // Import custom styles to customize the style of Google Map
  const styles = require('../../../assets/GoogleMapStyles.json')
  
  const locationHandler = (event, map) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()

    setLocationMarker(
      <Marker
        position={{ lat: lat, lng: lng }}
      />)

    props.parentCallback(lat, lng)
  }

  return (
    <div className='share-location'>
      <div className='InstructionBold'>Location tells its own story. Place your location on the map.</div>
      <Map
        google={props.google}
        zoom={11.5}
        styles={styles}
        className='map'
        initialCenter={{ lat: 42.3601, lng: -71.05 }}
        onClick={(t, map, event) => locationHandler(event, map)}
      >{locationMarker}
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(ShareLocation)
