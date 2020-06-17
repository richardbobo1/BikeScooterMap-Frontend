import React from 'react';
import { Card } from 'semantic-ui-react'
import Route from './Route'
 
class RoutesContainer extends React.Component {
  render() {
   
    return (
  

    <Card.Group className="ui stackable link cards" itemsPerRow ={4} > 
    {
        this.props.routes.map(route => <Route favorites={this.props.favorites} completeRoutes={this.props.completeRoutes}
                onHeartClick={this.props.onHeartClick} loggedIn={this.props.loggedIn} 
                removeFavorite={this.props.removeFavorite} addFavorite={this.props.addFavorite}
                markCompleted={this.props.markCompleted} markIncomplete={this.props.markIncomplete}
                route={route} key={route.id} userId={this.props.userId} />)
    }

    </Card.Group>

    )
   
  }
}
 
export default RoutesContainer;