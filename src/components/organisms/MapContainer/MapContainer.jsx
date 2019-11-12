import React, { useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { StoryView } from 'molecules'
import './MapContainer.css'

const MapContainer = (props) => {
  const [currentStory, setCurrentStory] = useState([])

  const markerClickHandler = (asset) => {
    setCurrentStory(asset)
  }

  const displayMarkers = () => {
    return props.assets.map((asset) => {
      return (
        <Marker
          key={asset.id}
          position={{
            lat: asset.latitude,
            lng: asset.longitude
          }}
          onClick={() => markerClickHandler(asset)}
        />)
    })
  }

  return (

    <div className='MapContainer'>
      <StoryView asset={currentStory} />
      <Map
        google={props.google}
        zoom={11.5}
        className='Map'
        initialCenter={{ lat: 42.3601, lng: -70.85 }}
      >{displayMarkers()}
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(MapContainer)
