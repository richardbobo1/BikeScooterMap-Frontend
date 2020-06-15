import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapFilterForm from './MapFilterForm';
import { Grid, Segment, Header, Search, Button, Modal, Divider } from 'semantic-ui-react';
import MapContainer from './MapContainer';
 
class MapPage extends React.Component {


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
    
            this.setState({ capbikes: data.data.stations})
        })

        //fetch hellbiz bikes
        fetch("https://api.helbiz.com/admin/reporting/washington/gbfs/free_bike_status.json")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ hellbizbikes : data.data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })

        //fetch jumpikes
        // fetch("https://gbfs.uber.com/v1/dcb/free_bike_status.json", {
        //     mode:'no-cors'
        
        // } )
        // .then(resp => resp.json())
        // .then(data => { 
    
        //     console.log("jump bikes", data)
        //     this.setState({ jumpbikes: data})
        // })


    }



    createBikeMarkers = () => {

        // var gmarkers = Array();

        //  for( i = 0; i < this.state.capbikes.length; i++ ) {
        //         var position = new google.maps.LatLng(this.state.capbikes.lat, this.state.capbikes.lon);
        //         bounds.extend(position);
        //         marker = new google.maps.Marker({
        //             position: position,
        //             map: map,
        //             title: markers[i].title 
        //         });
        // gmarkers.push(marker);
        // }
  
        // // hide all the markers 
        // for(i = 0 ; i< gmarkers.length; i++) 
        // gmarkers[i].setVisible(false);

    }




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

                        <Segment>
                        {/* <Header as='h2' floated='right'>
                            <h1>Favorites</h1>
                        </Header>
                            <Divider clearing /> */}




                        <div className="map">
                        <MapContainer stations={this.state.capbikes} hellbizbikes={this.state.hellbizbikes} />
                        </div>

                        </Segment>

                    </Grid.Column>
            </Grid> 



       
    </div>
    )
  }
}
 
export default MapPage;

