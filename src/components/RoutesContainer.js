import React from 'react';
import { Card } from 'semantic-ui-react'
import Route from './Route'
 
class RoutesContainer extends React.Component {
  render() {
    return (
  

    <Card.Group className="ui stackable link cards" itemsPerRow ={4} > 
    {
        this.props.routes.map(route => <Route favorites={this.props.favorites} route={route} key={route.id} />)
    }

    </Card.Group>

    )
   
  }
}
 
export default RoutesContainer;