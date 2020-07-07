import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, OverlayView } from 'google-maps-react';
import { Grid, Segment, Header, Search, Button, Modal, Divider } from 'semantic-ui-react'
import CapBikeIcon from '../cbshareicon.png'
import HelbizIcon from '../helbiz.png'
import JumpLogo from '../assets/jump.png'




class MapContainer extends React.Component {


    constructor(){
        super();
        this.state = {
            selectedStation: null,
            visible: false,
            showingInfoWindow: false,
            activeMarket: {},
            selectedPlace: {},
            station: false
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


    displayInfoWindow = (bikestation) => {

    }



    onMarkerClick = (props, marker, e) => {
    
        if(props.name === "Capital BikeShare"){

            //find match of station ID to capbikestations 
            let stationStatus = this.props.capbikestatus.filter(station => station.station_id === props.station.station_id )

            let content = (<p>

                <table>
                <tr>
                    <td>
                        Bikes:
                    </td>
                    <td>
                        <b>{stationStatus[0].num_bikes_available}</b>
                    </td>
                </tr>   
                <tr>
                    <td>
                        Docks:
                    </td>
                    <td>
                    <b>{stationStatus[0].num_docks_available}</b>
                    </td>
                </tr>  

                </table>

                <br />
                <a href="https://apps.apple.com/us/app/capital-bikeshare/id1233403073" target="_blank">Apple AppStore </a>&nbsp; &nbsp; | &nbsp; &nbsp;
                <a href="https://play.google.com/store/apps/details?id=com.motivateco.capitalbikeshare&hl=en" target="_blank">GooglePlay </a>
                </p>)
            

            //set station true, set 
            this.setState({
                station: true,
                bikesAvail: stationStatus.num_bikes_available,
                docksAvail: stationStatus.num_docks_available,
                infoContent: content 
            })
        } else {
            let content = (<>
                          
                <a href={props.appleUrl} target="_blank">Apple AppStore </a>&nbsp; &nbsp; | &nbsp; &nbsp;
                <a href={props.androidUrl} target="_blank">GooglePlay </a>
                <br />
                <br />
            </>)
            
            this.setState({
                infoContent: content 
            })
        }






        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
          });
    }

 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        station: false,
        bikesAvail: '',
        docksAvail: ''
      })
    }
  };




 render() {




    return (
            <div className="map">
                <Map google={this.props.google} zoom={16}
                onClick={this.onMapClicked}
                    initialCenter={{
                        lat: 38.9072,
                        lng: -77.0369
                        }}>
                    
            

                   { 
                   
                    this.props.stations.map(station => (
                      
                            <Marker position={{ lat: station.lat, lng: station.lon }}                             
                                // onClick={() => this.setSelectedStation()} 
                                icon={require('../cbshareicon.png')}
                                bikesAvail={station.num_bikes_available}
                                name="Capital BikeShare"
                                id={station.station_id}
                                station={station}
                                onClick={this.onMarkerClick}
                                url="www.capitalbikeshare.com/"
                                >
                            </Marker>)) 
                   }

                   

                        { this.props.hellbizbikes.map(bike => (      
                        <Marker position={{ lat: bike.lat, lng: bike.lon }} 
                        onClick={() => this.setSelectedStation()} 
                        onClick={this.onMarkerClick}
                        icon={require('../helbiz.png')}
                        name="Helbiz Bikes"
                        appleUrl="https://apps.apple.com/us/app/helbiz/id1438844293"
                        androidUrl="https://play.google.com/store/apps/details?id=com.helbiz.android&hl=en_US"
                        url="www.helbiz.com/HelbizBike"
                        >

                        </Marker>

                        )
                                                
                        )

                        }


{/* { 
                   
                   this.props.jumpbikes.map(bike => (

                           <Marker position={{ lat: bike.lat, lng: bike.lon }}        
                                id={bike.id}                     
                               onClick={() => this.setSelectedStation()} 
                               icon={require('../assets/jump.png')}
                               onClick={this.onMarkerClick}
                               markerProps={bike}
                               name="Jump Bikes"
                                appleUrl="https://apps.apple.com/ai/app/uber/id368677368"
                                androidUrl="https://play.google.com/store/apps/details?id=com.jumpmobility&hl=en&gl=SC"
                               url="www.jump.com"
                               >

                           </Marker>)) 
                  } */}


                { 
                   
                   this.props.skipscooters.map(bike => (

                           <Marker position={{ lat: bike.lat, lng: bike.lon }}        
                                id={bike.bike_id}                     
                               onClick={() => this.setSelectedStation()} 
                               icon={require('../assets/SKIPscooter.png')}
                               onClick={this.onMarkerClick}
                               markerProps={bike}
                               name="skip"
                                appleUrl="https://apps.apple.com/us/app/skip-scooters/id1296115307"
                                androidUrl="https://play.google.com/store/apps/details?id=com.waybots&hl=en_US"
                               url="https://rideskip.com/"
                               >

                           </Marker>)) 
                  }


                { 
                   
                   this.props.spinscooters.map(bike => (

                           <Marker position={{ lat: bike.lat, lng: bike.lon }}        
                                id={bike.bike_id}                     
                               onClick={() => this.setSelectedStation()} 
                               icon={require('../assets/spin-scooter.png')}
                               onClick={this.onMarkerClick}
                               markerProps={bike}
                               name="spin"
                                appleUrl="https://apps.apple.com/us/app/spin-electric-scooters/id1241808993"
                                androidUrl="https://play.google.com/store/apps/details?id=pm.spin&hl=en_US"
                               url="https://www.spin.app/"
                               >

                           </Marker>)) 
                  }


                { 
                   
                   this.props.razorscooters.map(bike => (

                           <Marker position={{ lat: bike.lat, lng: bike.lon }}        
                                id={bike.bike_id}                     
                               onClick={() => this.setSelectedStation()} 
                               icon={require('../assets/razor-scooter.png')}
                               onClick={this.onMarkerClick}
                               markerProps={bike}
                               name="razor"
                                appleUrl="https://apps.apple.com/us/app/razor-scooter-share/id1414149130"
                                androidUrl="https://play.google.com/store/apps/details?id=com.razor.razor&hl=en_US"
                               url="https://www.razor.com/share/"
                               >

                           </Marker>)) 
                  }



                { 
                   
                   this.props.lyftscooters.map(bike => (

                           <Marker position={{ lat: bike.lat, lng: bike.lon }}        
                                id={bike.bike_id}                     
                               onClick={() => this.setSelectedStation()} 
                               icon={require('../assets/lyft-scooter.png')}
                               onClick={this.onMarkerClick}
                               markerProps={bike}
                               name="lyft"
                                appleUrl="https://apps.apple.com/us/app/lyft/id529379082"
                                androidUrl="https://play.google.com/store/apps/details?id=me.lyft.android&hl=en_US"
                               url="https://www.lyft.com/scooters"
                               >

                           </Marker>)) 
                  }


                { 
                   
                   this.props.birdscooters.map(bike => (

                           <Marker position={{ lat: bike.lat, lng: bike.lon }}        
                                id={bike.bike_id}                     
                               onClick={() => this.setSelectedStation()} 
                               icon={require('../assets/bird-scooter.png')}
                               onClick={this.onMarkerClick}
                               markerProps={bike}
                               name="bird"
                                appleUrl="https://apps.apple.com/us/app/bird-be-free-enjoy-the-ride/id1260842311"
                                androidUrl="https://play.google.com/store/apps/details?id=co.bird.android&hl=en_US"
                               url="https://www.bird.co/"
                               >

                           </Marker>)) 
                  }


{ 
                   
                   this.props.limescooters.map(bike =>  (
                           
                           <Marker position={{ lat: bike.lat, lng: bike.lon }}        
                                id={bike.bike_id}                     
                               onClick={() => this.setSelectedStation()} 
                               icon={require('../assets/lime-logo.png')}
                               onClick={this.onMarkerClick}
                               markerProps={bike}
                               name="lime"
                                appleUrl="https://apps.apple.com/us/app/lime-your-ride-anytime/id1199780189"
                                androidUrl="https://play.google.com/store/apps/details?id=com.limebike&hl=en_US"
                               url="https://www.li.me"
                               >

                           </Marker>)) 
                  }


                            <InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}>
                                    <div>
                                    <p><b>{this.state.selectedPlace.name}</b></p>
                                        {this.state.infoContent}
                                    <p>{this.state.selectedPlace.url}</p>
                                    </div>
                                </InfoWindow>


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