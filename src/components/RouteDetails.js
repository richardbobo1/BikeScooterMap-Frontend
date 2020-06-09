import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import RouteComments from './RouteComments'
import {Icon, Button } from 'semantic-ui-react'


export default class RouteDetails extends React.Component {


    render(){
        return (
            <div>
            <p>bike route details </p>
            <h3>{this.props.bikeRoute.name}</h3>
            <p>{this.props.bikeRoute.length} miles</p>
            <p>{this.props.bikeRoute.difficulty}</p>
            <p>{this.props.bikeRoute.surface}</p>
            <p>{this.props.bikeRoute.short_description}</p>
            <p>{this.props.bikeRoute.description}</p>

            <p>{this.props.bikeRoute.tips}</p>
            <img src={this.props.bikeRoute.google_map} className="ui image small" />


            <a>
                 
                <Icon name='heart' onClick={this.onHeartClick} /> Favorite
                <Icon name='heart outline' onClick={this.onHeartClick} />
                </a>
                <br />
            <a>
            <Icon name='check circle' onClick={this.onCheckMarkClick}  /> 
                <Icon name='check circle outline' onClick={this.onCheckMarkClick}  /> Completed
            </a>
            <br /> 
            <Button primary inverted>View Map</Button>
            <br />
            <br />
                <div className="reviews">
                    <RouteComments />
                </div>

            </div>
           
        )
    }
}
