import React, { useState, useEffect } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { StoryView } from 'molecules'
import { Row, Col, Container } from 'react-bootstrap'
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
      scaledSize: new props.google.maps.Size(40, 40)
    }

    const markerIconCurated = {
      url: 'http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png',
      scaledSize: new props.google.maps.Size(40, 40)
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
      } else if (story.description.includes('5')) {
        return (
          <Marker
            key={story.id}
            position={{
              lat: story.latitude,
              lng: story.longitude
            }}
            icon={markerIconCurated}
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
    <Container className='MapContainer'>
      <Row>
        <Col lg={6} sm={12}>
          <Map
            google={props.google}
            zoom={11.5}
            styles={[
              {
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#f5f5f5'
                  }
                ]
              },
              {
                elementType: 'labels.icon',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#616161'
                  }
                ]
              },
              {
                elementType: 'labels.text.stroke',
                stylers: [
                  {
                    color: '#f5f5f5'
                  }
                ]
              },
              {
                featureType: 'administrative',
                stylers: [
                  {
                    visibility: 'simplified'
                  }
                ]
              },
              {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#bdbdbd'
                  }
                ]
              },
              {
                featureType: 'poi',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#eeeeee'
                  }
                ]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#757575'
                  }
                ]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#e5e5e5'
                  }
                ]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#9e9e9e'
                  }
                ]
              },
              {
                featureType: 'road',
                stylers: [
                  {
                    weight: 0.5
                  }
                ]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                  {
                    visibility: 'simplified'
                  },
                  {
                    weight: 1
                  }
                ]
              },
              {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [
                  {
                    color: '#f2cc90'
                  }
                ]
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: '#55ef00'
                  }
                ]
              },
              {
                featureType: 'road',
                elementType: 'labels.icon',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'road.arterial',
                elementType: 'labels',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'road.arterial',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#757575'
                  }
                ]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#dadada'
                  }
                ]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#616161'
                  }
                ]
              },
              {
                featureType: 'road.local',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'road.local',
                elementType: 'labels',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#9e9e9e'
                  }
                ]
              },
              {
                featureType: 'transit',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#e5e5e5'
                  }
                ]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#eeeeee'
                  }
                ]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#b5c6d5'
                  }
                ]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#9a999a'
                  }
                ]
              }
            ]}
            className='Map'
            initialCenter={{ lat: 42.3601, lng: -71.05 }}
          >{displayMarkers()}
          </Map>
        </Col>
        <Col lg={6} sm={12}>
          <StoryView story={currentStory} arrayIndex={props.stories.indexOf(currentStory) + 1} tags={props.tags} length={props.stories.length} />
        </Col>
      </Row>
    </Container>
  )
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(MapContainer)
