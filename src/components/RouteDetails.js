import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import RouteComments from './RouteComments'
import {Icon, Button, Container, Header, Grid, Segment, Divider } from 'semantic-ui-react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export default class RouteDetails extends React.Component {


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
                <a>
                <Icon name='heart' onClick={this.onHeartClick} /> Favorite </a>  | <a>                <Icon name='check circle outline' onClick={this.onCheckMarkClick}  /> Completed
                </a>
               
            </Container>
            </div>

            <div className="page">
            <div className="page-header">
                <Grid>
                    <Grid.Column width={3}>

                        <img src={this.props.bikeRoute.image_url} className="ui medium bordered image" />

                        <Segment>
                            <h2>About</h2>
                        <p>Distance: {this.props.bikeRoute.length} miles</p>
                        <p>Difficulty: {this.props.bikeRoute.difficulty}</p>
                        <p>Surface: {this.props.bikeRoute.surface}</p>
                        </Segment>

                        <Button>View Source</Button>
                        <br />
                        <br />
                        <Button primary >View Map</Button>
                    </Grid.Column>
                    <Grid.Column width={7}>
                    <h1>About This Bike Route</h1>
                    <a>
                <Icon name='heart' onClick={this.onHeartClick} /> Favorite </a>  | <a>                <Icon name='check circle outline' onClick={this.onCheckMarkClick}  /> Completed
                </a>
                    <h3>{this.props.bikeRoute.name}</h3>
                    {this.props.bikeRoute.description}
                    <Divider />
                    <h1>Tips</h1>
                    {this.props.bikeRoute.tips}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Divider />
                       
                        <div className="google">
                          
                        <img src="https://www.evelo.com/wp-content/uploads/2019/05/050119-google-hero.jpg" className="ui large bordered image" />
                        </div>
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



