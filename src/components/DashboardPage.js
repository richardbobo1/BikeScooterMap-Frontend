import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid, Search, Form, Card, Icon, Divider, Segment, Button, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import LogRideForm from "./LogRideForm";
import RideLogTable from './RideLogTable'
import NewTripForm from './modals/NewTripForm'


 
class DashboardPage extends React.Component {

    constructor(){
        super();
        this.state = {
            journalEntries: [],
            journalEntriesDisplayed: [],
            totalMiles: 0,
            totalRides: 0,
            totalTime: 0,
            totalCalories: 0,
            totalDollars: 0,
            trips: [],
            tripId: ""
          }
    }


    //modal will be the new route form 
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };



    
    componentDidMount(){

        this.setState({
            trips: this.props.currentUser.trips 
        })



     if(this.props.userId !== ''){

     
        fetch(`http://localhost:3000/journals/${parseInt(this.props.userId)}`)
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ 
                journalEntries: data,
                journalEntriesDisplayed: data 
            })
            this.calculateMiles()
            this.calculateRides() 
            this.calculateTime()
            this.calculateCalories()
            this.calculateDollarsSaved()
            this.calculateCarbonEmission()
        })
    }
        


    }
    


    // CALCULATE DASHBOARD NUMBERS 
    /////////////////////////////////////
    calculateMiles= () => {
        var x = 0 
        let data = this.state.journalEntries

        for (var i=0; i < data.length; i++){
            x += data[i].distance 
        }
        this.setState({
            totalMiles: x 
        })
    }

    calculateRides= () => {
        var x = 0 
        let data = this.state.journalEntries
        // this.state.journalEntries.map(journal =>  x += journal.distance)
        for (var i=0; i < data.length; i++){
            x += 1
        }
        this.setState({
            totalRides: x 
        })
    }

    calculateTime= () => {
        var x = 0 
        let data = this.state.journalEntries
        // this.state.journalEntries.map(journal =>  x += journal.distance)
        for (var i=0; i < data.length; i++){
            x += data[i].duration
        }
        this.setState({
            totalTime: x 
        })
    }

    calculateCalories= () => {
        var x = 0 
        let data = this.state.journalEntries
        // this.state.journalEntries.map(journal =>  x += journal.distance)
        for (var i=0; i < data.length; i++){
            x += data[i].calories
        }
        this.setState({
            totalCalories: x 
        })
    }

    calculateDollarsSaved= () => {
        var x = 0 
        let data = this.state.journalEntries
        // this.state.journalEntries.map(journal =>  x += journal.distance)
        for (var i=0; i < data.length; i++){
            x += data[i].dollarssaved
        }
        this.setState({
            totalDollars: x 
        })
    }

    calculateCarbonEmission = () => {
        let gramsCarbon = 404   //per mile, avg passenger vehicle, per EPA
        var miles = 0 
        let data = this.state.journalEntries
        // this.state.journalEntries.map(journal =>  x += journal.distance)
        for (var i=0; i < data.length; i++){
            miles += data[i].distance
        }

        let totalGrams = miles*gramsCarbon
        let totalPounds = Math.floor(totalGrams/453)  //apx 453 grams === 1 lb
        this.setState({
            totalCarbon: totalPounds 
        })
    }


    ///APEND NEW TRIP
    appendNewtrip = (tripObj) => {
        this.setState({
            trips: [tripObj, ...this.state.trips]
        })
    }
    


        // APPEND NEW JOURNAL ENTRY 
    /////////////////////////////////////
    
    appendNewJournalEntry = (journalEntryObj) => {

        let x = this.state.totalMiles += parseInt(journalEntryObj.distance)
        let y = this.state.totalRides + 1
        let z = this.state.totalTime + parseInt(journalEntryObj.duration)
        let c = this.state.totalCalories + parseInt(journalEntryObj.calories)
        let d = this.state.totalDollars + parseInt(journalEntryObj.dollarssaved)

        this.setState({
            journalEntries: [journalEntryObj, ...this.state.journalEntries ],
            journalEntriesDisplayed: [journalEntryObj, ...this.state.journalEntries ],
            totalMiles: x,
            totalRides: y,
            totalTime: z,
            totalCalories: c,
            totalDollars: d

        })

        this.calculateCarbonEmission()
        //then recalculate
    }


    // DELETE JOURNAL ENTRY 
    /////////////////////////////////////


    deleteJournalEntry = (journalEntryObj) => {
        let x = this.state.totalMiles -= parseInt(journalEntryObj.distance)
        let y = this.state.totalRides -1
        let z = this.state.totalTime - parseInt(journalEntryObj.duration)
        let c = this.state.totalCalories - parseInt(journalEntryObj.calories)
        let d = this.state.totalDollars -parseInt(journalEntryObj.dollarssaved)


        fetch(`http://localhost:3000/journals/${journalEntryObj.id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json() )
        .then( res => {
        //need to find journal entry in the array 
        //and then remove it from that array 
        let newArray = this.state.journalEntries.filter( entry => entry.id !== journalEntryObj.id )
        let filteredArray = this.state.journalEntriesDisplayed.filter( entry => entry.id !== journalEntryObj.id )
        this.setState({
                //need to change this journal entry 
            journalEntries: newArray,
            journalEntriesDisplayed: filteredArray,
            totalMiles: x,
            totalRides: y,
            totalTime: z,
            totalCalories: c,
            totalDollars: d 

        })



        })



    }
    

    
    editJournalEntry = () => {
        console.log("clicking on edit journal entry")
    }


    viewJournalEntry = () => {
        console.log("clicking on VIEW journal entry")
    }


    calculateHours = (minutes) => {
        let hours = (minutes/60)

        let min = minutes % 60
        let total = `${Math.floor(hours)}h ${min}m `
        return total 
    }


    handleChange = (e) => {
        console.log("changing....", e.target.value )
    
        this.setState({ [e.target.name]: e.target.value });

        this.handleTripFilter(e)
       
      };


    handleTripFilter = (event) => {
  
      
        let newArray = this.state.journalEntries
        let filteredArray = []

        if(event.target.value === "All"){
    
            let filteredArray = newArray
            this.setState({
                journalEntriesDisplayed: filteredArray
            })
        } else {
           let filteredArray = newArray.filter( journal => {
                return journal.trip_id !== null && journal.trip_id === parseInt(event.target.value)   
        
        })
        this.setState({
            journalEntriesDisplayed: filteredArray
        })
        }


    }




  render() {

    


    const extra = (
        <div>
       
          <Icon name='bicycle' />
          {this.state.totalRides} rides |    {this.state.totalMiles} miles logged
         
          <br />
        <a>
          <Icon name='map' />
           {this.props.favoriteRoutes.length} favorites | {this.props.completeRoutes.length} completed<br />
        </a>
        </div>
      )


    return (
        <div className="page">
            <div className="page-header">
                <Grid stackable>
                    <Grid.Column width={6}>
                        <h1>My Dashboard</h1>
                    </Grid.Column>
                    <Grid.Column width={4}>
                
                    </Grid.Column>
                    <Grid.Column width={6}>
                    
                    {/* <NewRouteForm onShowModal={this.showModal} onClose={this.hideModal} appendNewRoute={this.appendNewRoute} /> */}
                        
                    </Grid.Column>
                </Grid> 
            </div>

            <Grid stackable >
                    <Grid.Column width={4}>
                       <div> 
                       <Card
                            image={this.props.currentUser.img_url}
                            header={this.props.currentUser.first_name + " " +this.props.currentUser.last_name}
                            meta={this.props.currentUser.current_city}
                            description={this.props.currentUser.about_me}
                            extra={extra}
                        />
                       </div>
                        <br />
                        <br/>
                       <div>
                       {this.state.trips.length === 0 ? null : 
                                <Form >
                                <Form.Field>
                                <h3>Trip Filter</h3>
                                <select fluid  name="tripId" placeholder="All" value={this.state.tripId} onChange={this.handleChange}>
                                    <option value="All">All</option>
                                    {this.state.trips.map(trip => {
                                        return <option value={trip.id}>{trip.trip_name}</option>
                                    })}
                                </select>
                                </Form.Field>
                                </Form>
                                
                                }
                       </div>
                        {/* <div>
                            <Button>Edit Profile</Button>
                        </div> */}
    
                    </Grid.Column>
                    <Grid.Column width={11}>

                        {/* right here I will put for square segements with dashboard type data  */}
                        <div className="dashboard-header">
                            <Grid stackbale >
                                <Grid.Column width={4}>
                                    <Segment>
                                        <h3 style={{color: "gray"}}>MILES</h3>
                                        <h1>{this.state.totalMiles}</h1>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Segment>
                                        <h3 style={{color: "gray"}}>RIDES</h3>
                                        <h1>{this.state.totalRides}</h1>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Segment>
                                        <h3 style={{color: "gray"}}>TIME</h3>
                                        <h1>{this.calculateHours(this.state.totalTime)}</h1>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                <Segment>
                                        <h3 style={{color: "gray"}}>CALORIES</h3>
                                        <h1>{this.state.totalCalories}</h1>
                                    </Segment>
                                </Grid.Column>

                            </Grid>
                        </div>


                        <div className="dashboard-header">
                            <Grid stackbale >
                                <Grid.Column width={8}>
                                    <Segment id="environment" >
                                        <h3 style={{color: "black"}}>CO<sub>2</sub> Emissions Saved</h3>
                                        <h1>{this.state.totalCarbon} lbs</h1>
                                    </Segment>
                                </Grid.Column>
    
                                <Grid.Column width={8}>
                                    <Segment id="environment">
                                        <h3 style={{color: "black"}}>$ Dollars Saved by Riding</h3>
                                        <h1>${this.state.totalDollars}.00</h1>
                                    </Segment>
                                </Grid.Column>
            

                            </Grid>
                        </div>

                        <Divider />
                       
                        <div>

                        <Grid>
                            <Grid.Column width={8}>
                                <h2>Riding History</h2>
                            </Grid.Column>
                            <Grid.Column  width={8}>
    
                                <NewTripForm appendNewtrip={this.appendNewtrip} userId={this.props.userId} />
                                <LogRideForm  appendNewJournalEntry={this.appendNewJournalEntry} trips={this.state.trips} currentUser={this.props.currentUser} userId={this.props.userId} />
                            </Grid.Column>
                        </Grid>
                        </div>
                            <RideLogTable journalEntries={this.state.journalEntriesDisplayed} deleteJournalEntry={this.deleteJournalEntry} />
                        
                    </Grid.Column>
            </Grid> 

        </div>
    )
  }

}
 
export default DashboardPage;