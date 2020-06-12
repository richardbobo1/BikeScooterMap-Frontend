import React from 'react';
import FavoritesContainer from './FavoritesContainer' 
import {Grid, Sticky, Divider, Segment, Header } from 'semantic-ui-react'

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

                <Grid stackable>
                    <Grid.Column width={3}>
                    <h1>My Routes</h1>

                        
                        <div className="my-routes-dashboard">
                        <Segment>
                        <h3 style={{color: "gray"}}>FAVORITES</h3>
                        <h1>{this.props.favorites.length} </h1>
                        <Divider />
                        <h3 style={{color: "gray"}}>COMPLETED</h3>
                        <h1>{this.props.completedRoutes.length}</h1>
                        </Segment>
                           </div>
                       
                  

                    </Grid.Column>
                    <Grid.Column width={12}>
 
            <Segment>
            <div className="routes-container"> 
           
            <Header as='h2' floated='right'>
                <h1>Favorites</h1>
            </Header>
         
            <Divider clearing />
                <FavoritesContainer routes={this.props.favorites} favorites={this.props.favorites} 
                markCompleted={this.props.markCompleted} markIncomplete={this.props.markIncomplete}
                completedRoutes={this.props.completedRoutes}  removeFavorite={this.props.removeFavorite}  addFavorite={this.props.addFavorite} />
            </div>

            </Segment>
           
            <Segment>
            
            <Header as='h2' floated='right'>
                <h1>Completed</h1>
            </Header>
        
            <Divider clearing />
            <div className="routes-container"> 
                <FavoritesContainer routes={this.props.completedRoutes} favorites={this.props.favorites } completedRoutes={this.props.completedRoutes} 
                markCompleted={this.props.markCompleted} markIncomplete={this.props.markIncomplete}
                removeFavorite={this.props.removeFavorite}  addFavorite={this.props.addFavorite} />
            </div>

            </Segment>


                    </Grid.Column>
            </Grid> 


{/* 
            <div className="page-header"> 
                <h1>My Favorite Biking Routes</h1>
            </div>

            <div className="routes-container"> 
                <FavoritesContainer routes={this.props.favorites} favorites={this.props.favorites} 
                markCompleted={this.props.markCompleted} markIncomplete={this.props.markIncomplete}
                completedRoutes={this.props.completedRoutes}  removeFavorite={this.props.removeFavorite}  addFavorite={this.props.addFavorite} />
            </div>

            <div className="page-header"> 
                <h1>My Completed Routes</h1>
            </div>

            <div className="routes-container"> 
                <FavoritesContainer routes={this.props.completedRoutes} favorites={this.props.favorites } completedRoutes={this.props.completedRoutes} 
                markCompleted={this.props.markCompleted} markIncomplete={this.props.markIncomplete}
                removeFavorite={this.props.removeFavorite}  addFavorite={this.props.addFavorite} />
            </div> */}

        </div>

    
    )
  }


}
 
export default Favorites;