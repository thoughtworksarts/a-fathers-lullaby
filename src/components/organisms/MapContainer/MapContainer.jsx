import React, { useState, useEffect } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { StoryView } from 'molecules'
import './MapContainer.css'

const MapContainer = (props) => {
  const [currentStory, setCurrentStory] = useState(props.currentStory)

  const markerClickHandler = (story) => {
    setCurrentStory(story)
    props.parentCallback(story)
  }

  useEffect(() => {
    setCurrentStory(props.currentStory)
  }, [props.currentStory])

  const displayMarkers = () => {
    const markerIcon = {
      url: 'http://maps.google.com/mapfiles/kml/paddle/wht-circle.png',
      scaledSize: new props.google.maps.Size(25, 25)
    }

    const markerIconSelected = {
      url: 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png',
      scaledSize: new props.google.maps.Size(25, 25)
    }

    return props.stories.map(story => {
      if (story === currentStory) {
        return (
          <Marker
            key={story.id}
            position={{
              lat: story.latitude,
              lng: story.longitude
            }}
            icon={markerIconSelected}
            onClick={() => markerClickHandler(story)}
            parentCallback={() => markerClickHandler(story)}
          />)
      } else {
        return (
          <Marker
            key={story.id}
            position={{
              lat: story.latitude,
              lng: story.longitude
            }}
            icon={markerIcon}
            onClick={() => markerClickHandler(story)}
            parentCallback={() => markerClickHandler(story)}
          />)
      }
    })
  }

  return (
    <div className='MapContainer'>
      <Map
        google={props.google}
        zoom={11.5}
        className='Map'
        initialCenter={{ lat: 42.3601, lng: -71.05 }}
      >{displayMarkers()}
      </Map>
      <StoryView story={currentStory} arrayIndex={props.stories.indexOf(currentStory) + 1} tags={props.tags} length={props.stories.length} />
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(MapContainer)
