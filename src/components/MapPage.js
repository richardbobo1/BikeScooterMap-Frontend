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
            displayJB: true 
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
                                displayHB={this.state.displayHB} changeFilter={this.changeFilter}   handleRefreshBikes={this.handleRefreshBikes}
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
                        <MapContainer stations={this.state.capbikes} capbikestatus={this.state.capbikestatus} hellbizbikes={this.state.hellbizbikes} jumpbikes={this.state.jumpbikes} />
                        </div>

                        </Segment>

                    </Grid.Column>
            </Grid> 



       
    </div>
    )
  }
}
 
export default MapPage;

