import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapFilterForm from './MapFilterForm';
import { Grid, Search, Button, Modal } from 'semantic-ui-react'

 
class MapContainer extends React.Component {


    constructor(){
        super();
        this.state = {
            capbikes: [],
            hellbizbikes: [],
            jumpbikes: []
          }
    }


    componentDidMount(){
      

        //fetch cap bike share
        fetch("https://gbfs.capitalbikeshare.com/gbfs/en/station_information.json")
        .then(resp => resp.json())
        .then(data => { 
            console.log("capbike share:", data.data.stations) 
            this.setState({ capbikes: data.data.stations})
        })

        //fetch hellbiz bikes
        // fetch("https://gbfs.uber.com/v1/dcb/https://api.helbiz.com/admin/reporting/washington/gbfs/free_bike_status.json", 
        //     {mode:'cors', 
        //         headers: {
        //         'Content-Type': 'application/json'
        //       },
        //     })
        // .then(resp => resp.json())
        // .then(data => { 
    
        //     console.log("hellbiz bikes", data) 
        //     this.setState({ hellbizbikes : data})
        // })

        //fetch jumpikes
        fetch("https://gbfs.uber.com/v1/dcb/free_bike_status.json", {mode:'cors'} )
        .then(resp => resp.json())
        .then(data => { 
    
            console.log("jump bikes", data)
            this.setState({ jumpbikes: data})
        })
    }

    // function initMap() {
    //     // The location of Uluru
    //     var uluru = {lat: -25.344, lng: 131.036};
    //     // The map, centered at Uluru
    //     var map = new google.maps.Map(
    //         document.getElementById('map'), {zoom: 4, center: uluru});
    //     // The marker, positioned at Uluru
    //     var marker = new google.maps.Marker({position: uluru, map: map});
    //   }


    mapThroughCapBikes = () => {

    }




  render() {

    return (
        <div className="page">
            <div className="page-header">
                <h1>Find a Bike</h1>
            </div>
  
       


        <Grid>
                    <Grid.Column width={3}>
                        <div className="map-form">
                            <MapFilterForm />
                        </div>
    
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <div className="map">
                            <Map google={this.props.google} zoom={14}
                                initialCenter={{
                                    lat: 38.9072,
                                    lng: -77.0369
                                }}>
                
                            <Marker 
                                onClick={this.onMarkerClick}
                                name={'Current location'}  />

       

                            <InfoWindow onClose={this.onInfoWindowClose}>
                                {/* <div>
                                <h1>{this.state.selectedPlace.name}</h1>
                                </div> */}
                            </InfoWindow>
                            </Map>
                        </div>
                    </Grid.Column>
            </Grid> 



       
    </div>
    )
  }
}
 
// export default Map;

export default GoogleApiWrapper({
    // apiKey: (``)    AIzaSyCJxTaP4n4_VXh9ROu-Ry8Cg20cmXHFxvA12345
  })(MapContainer)