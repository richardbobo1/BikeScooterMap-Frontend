import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapFilterForm from './MapFilterForm';
import { Grid, Segment, Header, Search, Button, Modal, Divider } from 'semantic-ui-react'



class MapContainer extends React.Component {

 render() {

    return (
            <div className="map">
                <Map google={this.props.google} zoom={14}
                    initialCenter={{
                        lat: 38.9072,
                        lng: -77.0369
                        }}>
                    
                    {/* <Marker 
                        onClick={this.onMarkerClick}
                    name={'Current location'}  />

        

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                        <h1>Some info</h1>
                        </div>
                    </InfoWindow> */}
                </Map>
                </div>
            
    )
}

}

export default GoogleApiWrapper({
    // apiKey: 'AIzaSyDLasFT1pUU4PvGSgLSyyzBb09YnsUl2xI',
  })(MapContainer)