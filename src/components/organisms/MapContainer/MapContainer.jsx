import React, { useState, useEffect } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import './MapContainer.css'

const MapContainer = (props) => {
  const [assets, setAssets] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ASSETS_URL}`, {
      headers: {
        authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(assets => {
        setAssets(assets)
      })
      .catch(err => console.log(err))
  }, [])

  const displayMarkers = () => {
    return assets.map((asset) => {
      return (
        <Marker
          key={asset.id} position={{
            lat: asset.latitude,
            lng: asset.longitude
          }}
        />)
    })
  }

  return (
    <Map
      google={props.google}
      zoom={11.5}
      className='Map'
      initialCenter={{ lat: 42.3601, lng: -70.85 }}
    >{displayMarkers()}
    </Map>
  )
}

export default GoogleApiWrapper({

  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(MapContainer)
