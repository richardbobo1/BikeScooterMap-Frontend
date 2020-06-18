import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, OverlayView } from 'google-maps-react';
import MapFilterForm from './MapFilterForm';
import { Grid, Segment, Header, Search, Button, Modal, Divider } from 'semantic-ui-react'
import MarkerWindowInfo from './MarkerWindowInfo'


class RouteDetailMap extends React.Component {


    constructor(){
        super();
        this.state = {
            selectedStation: null,
            visible: false 
        }
    }

componentDidMount(){

}

 render() {



    return (
            <div className="small-map" style={{height: "200px"}}>
                <Map google={this.props.google} 
                className="small-map"
               
                    style= {{height: "200px"}}
 
                    zoom={10}
                    initialCenter={{
                        lat: this.props.bikeRoute.lat,
                        lng: this.props.bikeRoute.lng 
                        }}>
                    
                <Marker position={{ lat: this.props.bikeRoute.lat, lng: this.props.bikeRoute.lng  }}  >
                </Marker>

                </Map>
                </div>
            
    )
}

}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })(RouteDetailMap)