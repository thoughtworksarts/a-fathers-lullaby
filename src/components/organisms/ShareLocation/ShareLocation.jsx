import React, { useState, useEffect } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import './ShareLocation.css'

const ShareLocation = (props) => {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [locationMarker, setLocationMarker] = useState(null)

  const locationHandler = (event, map) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()

    console.log('Lat: ', lat)
    console.log('Lng: ', lng)

    setLocationMarker(
      <Marker
        position={{ lat: lat, lng: lng }}
      />)

    setLatitude(lat)
    setLongitude(lng)
  }

  useEffect(() => {
    console.log('UE Lat', latitude)
    console.log('UE long', longitude)
  })

  return (
    <div className='share-location'>
      <div className='InstructionBold'>Location tells its own story. Place your location on the map.</div>
      <Map
        google={props.google}
        zoom={11.5}
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
