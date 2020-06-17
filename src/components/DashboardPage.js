import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid, Search, Card, Icon, Divider, Segment, Button, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import LogRideForm from "./LogRideForm";
import RideLogTable from './RideLogTable'



 
class DashboardPage extends React.Component {

    constructor(){
        super();
        this.state = {
            journalEntries: [],
            totalMiles: 0,
            totalRides: 0,
            totalTime: 0,
            totalCalories: 0
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

     

     if(this.props.userId !== ''){

     
        fetch(`http://localhost:3000/journals/${parseInt(this.props.userId)}`)
        .then(resp => resp.json())
        .then(data => { 
            this.setState({ 
                journalEntries: data
            })
            this.calculateMiles()
            this.calculateRides() 
            this.calculateTime()
            this.calculateCalories()
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



        // APPEND NEW JOURNAL ENTRY 
    /////////////////////////////////////
    
    appendNewJournalEntry = (journalEntryObj) => {

        let x = this.state.totalMiles += parseInt(journalEntryObj.distance)
        let y = this.state.totalRides + 1
        let z = this.state.totalTime + parseInt(journalEntryObj.duration)
        let c = this.state.totalCalories + parseInt(journalEntryObj.calories)
  

        this.setState({
            journalEntries: [journalEntryObj, ...this.state.journalEntries ],
            totalMiles: x,
            totalRides: y,
            totalTime: z,
            totalCalories: c

        })

        //then recalculate
    }


    // DELETE JOURNAL ENTRY 
    /////////////////////////////////////


    deleteJournalEntry = (journalEntryObj) => {
        let x = this.state.totalMiles -= parseInt(journalEntryObj.distance)
        let y = this.state.totalRides -1
        let z = this.state.totalTime - parseInt(journalEntryObj.duration)
        let c = this.state.totalCalories - parseInt(journalEntryObj.calories)

        //need to find journal entry in the array 
        //and then remove it from that array 
        let newArray = this.state.journalEntries.filter( entry => entry.id !== journalEntryObj.id )

        this.setState({
                //need to change this journal entry 
            journalEntries: newArray,
            totalMiles: x,
            totalRides: y,
            totalTime: z,
            totalCalories: c

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
                            image='https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
                            header={this.props.currentUser.first_name + " " +this.props.currentUser.last_name}
                            meta={this.props.currentUser.current_city}
                            description={this.props.currentUser.about_me}
                            extra={extra}
                        />
                       </div>

    
                    </Grid.Column>
                    <Grid.Column width={11}>

                        {/* right here I will put for square segements with dashboard type data  */}
                        <div className="dashboard-header">
                            <Grid stackbale >
                                <Grid.Column width={4}>
                                    <Segment>
                                        <h3 style={{color: "gray"}}>TOTAL MILES</h3>
                                        <h1>{this.state.totalMiles}</h1>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={3}>
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


                        <Divider />
                       
                        <div>

                        <Grid>
                            <Grid.Column width={8}>
                                <h2>Riding History</h2>
                            </Grid.Column>
                            <Grid.Column  width={8}>
                                <LogRideForm  appendNewJournalEntry={this.appendNewJournalEntry} userId={this.props.userId} />
                            </Grid.Column>
                        </Grid>
                        </div>
                            <RideLogTable journalEntries={this.state.journalEntries} deleteJournalEntry={this.deleteJournalEntry} />
                        
                    </Grid.Column>
            </Grid> 

        </div>
    )
  }

}
 
export default DashboardPage;