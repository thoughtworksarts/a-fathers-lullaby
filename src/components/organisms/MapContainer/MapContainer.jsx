import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { StoryView } from 'molecules'
import { Row, Col, Container } from 'react-bootstrap'
import './MapContainer.css'

const MapContainer = (props) => {
  const { stories, currentStory, goToStory, tags } = props
  // Import custom styles to customize the style of Google Map
  const styles = require('assets/GoogleMapStyles.json')

  const displayMarkers = () => {
    const markerIcon = {
      url: 'http://maps.google.com/mapfiles/kml/paddle/wht-circle.png',
      scaledSize: new props.google.maps.Size(25, 25)
    }

    const markerIconSelected = {
      url: 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png',
      scaledSize: new props.google.maps.Size(40, 40)
    }

    const markerIconCurated = {
      url: 'http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png',
      scaledSize: new props.google.maps.Size(40, 40)
    }

    return stories.map(story => {
      let icon = markerIcon
      if (story === currentStory) {
        icon = markerIconSelected
      } else if (story.description.includes('5')) {
        icon = markerIconCurated
      }
      return (
        <Marker
          key={story.id}
          position={{
            lat: story.latitude,
            lng: story.longitude
          }}
          icon={icon}
          onClick={() => goToStory(story.id)}
        />
      )
    })
  }

  return (
    <Container className='MapContainer'>
      <Row>
        <Col lg={6} sm={12}>
          <Map
            google={props.google}
            zoom={11.5}
            styles={styles}
            className='Map'
            initialCenter={{ lat: 42.3601, lng: -71.05 }}
          >
            {displayMarkers()}
          </Map>
        </Col>
        <Col lg={6} sm={12}>
          <StoryView
            story={currentStory}
            arrayIndex={stories.indexOf(currentStory) + 1}
            tags={tags}
            length={stories.length}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(MapContainer)
