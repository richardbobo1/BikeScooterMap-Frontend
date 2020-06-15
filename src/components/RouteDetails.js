import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import RouteComments from './RouteComments'
import {Icon, Button, Container, Header, Grid, Segment, Divider } from 'semantic-ui-react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer'

export default class RouteDetails extends React.Component {

    constructor(){
        super();
        this.state = {
            favorite: false,
            completed: false
        }
    }

    onHeartClick = (event) => {
        console.log("clicked heart")
        this.setState({
            favorite: !this.state.favorite 
        })
    }

    onCheckMarkClick = (event) => {
        console.log("clicked checkmark")
        this.setState({
            completed: !this.state.completed
        })
    }


    render(){
        return (
            <div>


            <div className="route-details-header" >
            <Container className="content">
                <Header inverted as="h1">
                {this.props.bikeRoute.name}
                </Header>
                <p className="welcome-paragraph">
                {this.props.bikeRoute.short_description}
                </p>

               
            </Container>
            </div>

            <div className="page">
            <div className="page-header">
                <Grid stackable >
                    <Grid.Column width={3}>

                        <img src={this.props.bikeRoute.image_url} className="ui medium bordered image" />

                        <Segment>
                            <h2>About</h2>
                        <p><b>Distance:</b> {this.props.bikeRoute.length} miles</p>
                        <p><b>Difficulty: </b> {this.props.bikeRoute.difficulty}</p>
                        <p><b>Surface: </b> {this.props.bikeRoute.surface}</p>
                        </Segment>

                        <Button
                        primary 
                        target="_blank"
                        href={this.props.bikeRoute.source}
                        onclick="this.href = this.href.replace('[sub]',window.location)"
                        >View Source</Button>
                        <br />
                        <br />
                    </Grid.Column>
                    <Grid.Column width={7}>
                    <h1>{this.props.bikeRoute.name}</h1>
                    {/* <a>
                <Icon name='heart' onClick={this.onHeartClick} /> Favorite </a>  | <a>                <Icon name='check circle outline' onClick={this.onCheckMarkClick}  /> Completed
                </a> */}

                <a><Icon name={this.state.favorite ? 'blue heart': 'blue heart outline'} red onClick={(event) => this.onHeartClick(event)} id={this.props.bikeRoute.id} /> Favorite</a>{"    |    "}
 
                <a><Icon name={this.state.completed ? 'blue check circle': 'check circle outline'}  onClick={(event) => this.onCheckMarkClick(event)} id={this.props.bikeRoute.id} alt="Mark Complete"  />Mark Complete</a>



                    <h3>Key Details</h3>
                    {this.props.bikeRoute.description}
                    <Divider />
                    <h1>Tips</h1>
                    {this.props.bikeRoute.tips}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Divider />
                       
                        {/* <div className="google-map">
                          <MapContainer />
                        </div> */}
               <img src="https://www.evelo.com/wp-content/uploads/2019/05/050119-google-hero.jpg" className="ui large bordered image" />
                       
                        <Divider />
                        <h1>COMMENTS</h1>


                        <div className="reviews">
                            <RouteComments />
                         </div>

                    </Grid.Column>
                </Grid> 
            </div>





           
           



        


                </div>

            </div>
           
        )
    }
}



