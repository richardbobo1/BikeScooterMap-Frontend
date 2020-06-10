import React from 'react';
import FavoritesContainer from './FavoritesContainer' 

class Favorites extends React.Component {

    constructor(){
        super();
        this.state = {
            favorites: [],
            userId: 1 
          }
    }

    
      componentDidMount(){

      }
    


  render() {
 


    return (
        <div className="page">
            <div className="page-header"> 
                <h1>My Favorite Biking Routes</h1>
            </div>

            <div className="routes-container"> 
                <FavoritesContainer routes={this.props.favorites} favorites={this.props.favorites} completedRoutes={this.props.completedRoutes}  removeFavorite={this.props.removeFavorite}  addFavorite={this.props.addFavorite} />
            </div>

            <div className="page-header"> 
                <h1>My Completed Routes</h1>
            </div>

            <div className="routes-container"> 
                <FavoritesContainer routes={this.props.completedRoutes} favorites={this.props.favorites } completedRoutes={this.props.completedRoutes}  removeFavorite={this.props.removeFavorite}  addFavorite={this.props.addFavorite} />
            </div>

        </div>

    
    )
  }


}
 
export default Favorites;