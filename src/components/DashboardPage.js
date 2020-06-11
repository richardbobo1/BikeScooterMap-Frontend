import React, { Component } from "react";
import ReactDOM from "react-dom";
import NewRouteForm from './NewRouteForm'
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
            totalTime: 0 
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
  
        fetch(`http://localhost:3000/journals/${this.props.userId}`)
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



        // NEW JOURNAL ENTRY 
    /////////////////////////////////////




    









  render() {

    const extra = (
        <div>
        <a>
          <Icon name='bicycle' />
          16 rides |    545 miles logged
          </a>
          <br />
        <a>
          <Icon name='map' />
           6 favorites | 3 completed<br />
        </a>
        </div>
      )

   

    return (
        <div className="page">
            <div className="page-header">
                <Grid>
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

            <Grid>
                    <Grid.Column width={4}>
                       <div> 
                       <Card
                            image='https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
                            header='Richard Bobo'
                            meta='Washingtn, DC'
                            description='Richard is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                            extra={extra}
                        />
                       </div>

    
                    </Grid.Column>
                    <Grid.Column width={11}>

                        {/* right here I will put for square segements with dashboard type data  */}
                        <div className="dashboard-header">
                            <Grid>
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
                                        <h1>{this.state.totalTime} mins</h1>
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
                                <LogRideForm  />
                            </Grid.Column>
                        </Grid>
                        </div>
                            <RideLogTable journalEntries={this.state.journalEntries}  />
                        
                    </Grid.Column>
            </Grid> 

        </div>
    )
  }

}
 
export default DashboardPage;