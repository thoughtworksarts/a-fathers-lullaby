import React from 'react'
import './MapExample.css'
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapExample extends Component {
    render() {
        return (
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
      }
}

export default MapExample
