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
        fetch(`http://localhost:3000/favorite_routes/${this.state.userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        })
        .then(resp => resp.json())
        .then(data => { 
            
            this.setState({ favorites: data})
        })
      }
    


  render() {
    return (
        <div className="page">
            <div className="page-header"> 
                <h1>My Favorite Biking Routes</h1>
            </div>

            <div className="routes-container"> 
                <FavoritesContainer favorites={this.state.favorites} />
            </div>

        </div>

    
    )
  }


}
 
export default Favorites;