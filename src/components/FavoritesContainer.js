import React from 'react';
import { Card } from 'semantic-ui-react'
import FavRoute from './FavRoute'
 
class FavoritesContainer extends React.Component {
  render() {
    return (
  

    <Card.Group className="ui stackable link cards" itemsPerRow ={4} > 
    {
        this.props.favorites.map(favorite => <FavRoute route={favorite.route} key={favorite.route.id} />)
    }

    </Card.Group>

    )
   
  }
}
 
export default FavoritesContainer;