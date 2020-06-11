import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, google} from 'google-maps-react';
import MapFilterForm from './MapFilterForm';
import { Grid, Search, Button, Modal } from 'semantic-ui-react'
import { render } from 'react-dom';



export default class MapMarkers extends React.Component {




    render(){



        
    // var iconBase = 'http://maps.google.com/mapfiles/kml/shapes/';

    // var icons = {
    //     parking: {
    //     icon: iconBase + 'parking_lot_maps.png'
    //     },
    //     library: {
    //     icon: iconBase + 'library_maps.png'
    //     },
    //     info: {
    //     icon: iconBase + 'info-i_maps.png'
    //     }
    // };

    // var stations = []

     
  
    

            
          return(
              <div className="map">

              
              <Map google={this.props.google} zoom={14}
                                initialCenter={{
                                    lat: 38.9072,
                                    lng: -77.0369
                                }} >

                                {
                                     var stations = []
                                    this.props.capbikes.map(station => {
                                        let myLatLng = {position: new google.maps.LatLng(station.lat, station.lng), type: 'info'}
                                        return stations.push(myLatLng)
                                    })

                                stations.map(station => {
                                    <Marker position={station.position} icon="info" map="map" />
                                })
                                    
                                    };

                                }
                   </Map> 
            </div>
          )
                            

        }

}

