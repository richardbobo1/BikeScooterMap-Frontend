import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, OverlayView } from 'google-maps-react';
import MapFilterForm from './MapFilterForm';
import { Grid, Segment, Header, Search, Button, Modal, Divider } from 'semantic-ui-react'
import MarkerWindowInfo from './MarkerWindowInfo'
import CapBikeIcon from '../cbshareicon.png'
import HelbizIcon from '../helbiz.png'




class MapContainer extends React.Component {


    constructor(){
        super();
        this.state = {
            selectedStation: null,
            visible: false 
        }
    }

    onStationClick = (station) => {
        console.log("station clicked", station)
        let contentString = '<div> Station:'+ station.name +  '</div>'

    }

    setSelectedStation = () => {
        this.setState({
            selectedStation: 'station',
            visible: true 
        })
    }


 render() {




    return (
            <div className="map">
                <Map google={this.props.google} zoom={14}
                    initialCenter={{
                        lat: 38.9072,
                        lng: -77.0369
                        }}>
                    

                   { this.props.stations.map(station => (

                          
                            <Marker position={{ lat: station.lat, lng: station.lon }} 
                            
                            onClick={() => this.setSelectedStation()} 
                            icon={require('../cbshareicon.png')}
                            >

                            </Marker>

                   )
                                                      
                   )

                   }

                        { this.props.hellbizbikes.map(bike => (      
                        <Marker position={{ lat: bike.lat, lng: bike.lon }} 
                        label="HL"
                        onClick={() => this.setSelectedStation()} 
                        icon={require('../helbiz.png')}
                        >

                        </Marker>

                        )
                                                
                        )

                        }





                        {/* <InfoWindow
                            marker={this.state.selectedStation}
                            visible={this.state.visible}
                                >
                              <div>hello</div>
                          </InfoWindow> */}

                </Map>
                </div>
            
    )
}

}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })(MapContainer)