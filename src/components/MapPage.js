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
            capbikestatus: [],
            hellbizbikes: [],
            jumpbikes: [],
            displayCB: true,
            displayHB: true,
            displayJB: true, 
            displaySKIP: true,
            displaySPIN: true,
            displayRAZOR: true,
            displayLYFT: true,
            displayBIRD: true,
            skipscooters: [],
            spinscooters: [],
            razorscooters: [],
            lyftscooters: [],
            birdscooters: []
          }
    }


    componentDidMount(){
      

        //fetch cap bike share
        fetch("http://localhost:3000/companies/capbikes")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ capbikes: data.data.stations})
        })

        //fetch cap bike stations STATUS, because the previous fetch doesn't include bikes available info 
        fetch("http://localhost:3000/companies/capbikestatus")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ capbikestatus: data.data.stations})
        })


        //fetch hellbiz bikes
        fetch("http://localhost:3000/companies/helbizbikes")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ hellbizbikes : data.data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })

        //fetch jumpikes
        fetch("http://localhost:3000/companies/jumpbikes")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ jumpbikes: data.data.bikes})
        })



        //fetch skip scooters 
        fetch("http://localhost:3000/companies/skipscooters")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ skipscooters: data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })

        //fetch SPIN scooters 
        fetch("http://localhost:3000/companies/spinscooters")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ spinscooters: data.data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })
        
        //fetch RAZOR
        fetch("http://localhost:3000/companies/razorscooters")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ razorscooters: data.data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })

        //fetch LYFT
        fetch("http://localhost:3000/companies/lyftscooters")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ lyftscooters: data.data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })

         // BIRD scooters
         fetch("http://localhost:3000/companies/birdscooters")
         .then(resp => resp.json())
         .then(data => { 
             this.setState({ birdscooters: data.data.bikes.filter(bike => bike.is_reserved === false && bike.is_disabled === false ) })
         })



    }

    onDisplayCapBikes = () => {
        fetch("http://localhost:3000/companies/capbikes")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ capbikes: data.data.stations})
        })
    }

    onDisplayHelbizBikes = () => {
        fetch("http://localhost:3000/companies/helbizbikes")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ hellbizbikes : data.data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })
    }

    onDisplayJumpBikes = () => {
        fetch("http://localhost:3000/companies/jumpbikes")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ jumpbikes: data.data.bikes})
        })
    }

    onDisplaySKIPscooters = () => {
        fetch("http://localhost:3000/companies/skipscooters")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ skipscooters: data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })
    }

    onDisplaySPINscooters = () => {
        fetch("http://localhost:3000/companies/spinscooters")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ spinscooters: data.data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })
    }

    //razor
    onDisplayRAZORscooters = () => {
        fetch("http://localhost:3000/companies/razorscooters")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ razorscooters: data.data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })
    }
    //lyft
    onDisplayLYFTscooters = () => {
        fetch("http://localhost:3000/companies/lyftscooters")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ lyftscooters: data.data.bikes.filter(bike => bike.is_reserved === 0 && bike.is_disabled === 0 ) })
        })
    }
    //bird
    onDisplayBIRDscooters = () => {
        fetch("http://localhost:3000/companies/birdscooters")
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ birdscooters: data.data.bikes.filter(bike => bike.is_reserved === false && bike.is_disabled === false ) })
        })
    }



   handleRefreshBikes = (event) => {
       event.preventDefault();

       if (this.state.displayHB === true) { 
        this.setState({hellbizbikes: []});   
        console.log("refreshing hellbiz")
        this.onDisplayHelbizBikes() };
       if( this.state.displayCB === true) {
        this.setState({capbikes: [] });   
        console.log("refreshing capbike")
        this.onDisplayCapBikes() };


   }


    changeFilter = (company) => {
        console.log("filter changing", company)
        if (company === "cap" && this.state.displayCB === true ) {
            this.setState({
                displayCB: !this.state.displayCB,
                capbikes: []
                })
        } else if (company === "cap" && this.state.displayCB === false ) {
            this.onDisplayCapBikes() 
            this.setState({
                displayCB: !this.state.displayCB
                })
        }
        
        else if (company === "jump" && this.state.displayJB === true ){
            this.setState({
                displayJB: !this.state.displayJB,
                jumpbikes: []
                })
        } else if (company === "jump" && this.state.displayJB === false ) {
            this.onDisplayJumpBikes()
            this.setState({
                displayJB: !this.state.displayJB
            })
        }
        else if (company === "helbiz" && this.state.displayHB === true ){
            this.setState({
                displayHB: !this.state.displayHB,
                hellbizbikes: []
                })
        } else if (company === "helbiz" && this.state.displayHB === false){
            this.onDisplayHelbizBikes();
            this.setState({
                displayHB: !this.state.displayHB
                })
        }
        else if (company === "skip" && this.state.displaySKIP === true ){
            this.setState({
                displaySKIP: !this.state.displaySKIP,
                skipscooters: []
                })
        } else if (company === "skip" && this.state.displaySKIP === false){
            this.onDisplaySKIPscooters();
            this.setState({
                displaySKIP: !this.state.displaySKIP
                })
        }
        else if (company === "spin" && this.state.displaySPIN === true ){
            this.setState({
                displaySPIN: !this.state.displaySPIN,
                spinscooters: []
                })
        } else if (company === "spin" && this.state.displaySPIN === false){
            this.onDisplaySPINscooters();
            this.setState({
                displaySPIN: !this.state.displaySPIN
                })
        }
        else if (company === "razor" && this.state.displayRAZOR === true ){
            this.setState({
                displayRAZOR: !this.state.displayRAZOR,
                razorscooters: []
                })
        } else if (company === "razor" && this.state.displayRAZOR === false){
            this.onDisplayRAZORscooters();
            this.setState({
                displayRAZOR: !this.state.displayRAZOR
                })
        }
        else if (company === "lyft" && this.state.displayLYFT === true ){
            this.setState({
                displayLYFT: !this.state.displayLYFT,
                lyftscooters: []
                })
        } else if (company === "lyft" && this.state.displayLYFT === false){
            this.onDisplayLYFTscooters();
            this.setState({
                displayLYFT: !this.state.displayLYFT
                })
        }
        else if (company === "bird" && this.state.displayBIRD === true ){
            this.setState({
                displayBIRD: !this.state.displayBIRD,
                birdscooters: []
                })
        } else if (company === "bird" && this.state.displayBIRD === false){
            this.onDisplayBIRDscooters();
            this.setState({
                displayBIRD: !this.state.displayBIRD
                })
        }

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
                            <MapFilterForm displayCB={this.state.displayCB} displayJB={this.state.displayJB}
                                displaySKIP={this.state.displaySKIP}
                                displaySPIN={this.state.displaySPIN}
                                displayHB={this.state.displayHB} 
                                displayRAZOR={this.state.displayRAZOR}
                                displayLYFT={this.state.displayLYFT}
                                displayBIRD={this.state.displayBIRD}
                                changeFilter={this.changeFilter}   
                                handleRefreshBikes={this.handleRefreshBikes}
                                />
                        </div>
    
                    </Grid.Column>
                    <Grid.Column width={12}>

                        <Segment>
                        {/* <Header as='h2' floated='right'>
                            <h1>Favorites</h1>
                        </Header>
                            <Divider clearing /> */}




                        <div className="map">
                        <MapContainer stations={this.state.capbikes} capbikestatus={this.state.capbikestatus} hellbizbikes={this.state.hellbizbikes} 
                                jumpbikes={this.state.jumpbikes} skipscooters={this.state.skipscooters}
                                razorscooters={this.state.razorscooters}
                                lyftscooters={this.state.lyftscooters}
                                birdscooters={this.state.birdscooters}
                                spinscooters={this.state.spinscooters} />
                        </div>

                        </Segment>

                    </Grid.Column>
            </Grid> 



       
    </div>
    )
  }
}
 
export default MapPage;

