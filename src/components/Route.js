import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Link} from 'react-router-dom'
import { Icon, Card, Button } from 'semantic-ui-react'

export default class Route extends React.Component{



    render(){
        return (
            
            
            <div className="ui card">
            <div className="image">
                <img src={this.props.route.google_map} className="card-image" />
            </div>
            <div className="content">
                <a className="card-header">
                        {this.props.route.name}
                </a>
                <div className="meta">
                    <span className="diff-button"><b>{this.props.route.difficulty}</b></span> <span className="surface-button">{this.props.route.surface}</span>
                </div>
                <div className="description">
                    <p>
                        <b> {this.props.route.short_description}  </b>
                    </p>
                </div>

            </div>

                <div className="ui bottom attached button">
                    <Link to={`/bikeroutes/${this.props.route.id}`} > 
                        <Icon name='bicycle' />VIEW ROUTE
                    </Link>
                </div>
           
        </div>






           
        )
    }

}