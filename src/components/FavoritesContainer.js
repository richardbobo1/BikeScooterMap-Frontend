import React from 'react';
import { Card } from 'semantic-ui-react'
import FavRoute from './FavRoute'
 
class FavoritesContainer extends React.Component {
  render() {
    return (
  

    <Card.Group className="ui stackable link cards" itemsPerRow ={4} > 
    {
        this.props.routes.map(favorite => 
                <FavRoute route={favorite.route} favorite={favorite} key={favorite.id} favorites={this.props.favorites } completedRoutes={this.props.completedRoutes}
                removeFavorite={this.props.removeFavorite}  addFavorite={this.props.addFavorite} 
                markCompleted={this.props.markCompleted} markIncomplete={this.props.markIncomplete} />
                )
    }

    </Card.Group>

    )
   
  }
}
 
export default FavoritesContainer;