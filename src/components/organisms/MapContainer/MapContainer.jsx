import React, { useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import './MapContainer.css'

const MapContainer = (props) => {
  const [currentStory, setCurrentStory] = useState([])

  const markerClickHandler = (story) => {
    setCurrentStory(story)
    console.log(currentStory)
  }

  const displayMarkers = () => {
    const markerIcon = {
      url: 'http://maps.google.com/mapfiles/kml/paddle/wht-circle.png',
      scaledSize: new props.google.maps.Size(25, 25)
    }

    return props.stories.map(story => {
      return (
        <Marker
          key={story.id}
          position={{
            lat: story.latitude,
            lng: story.longitude
          }}
          icon={markerIcon}
          onClick={() => markerClickHandler(story)}
        />)
    })
  }

  return (
    <div className='MapContainer'>
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
