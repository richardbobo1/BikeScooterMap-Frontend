import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import RouteComments from './RouteComments'
import {Icon, Button, Container, Header, Grid, Segment, Divider } from 'semantic-ui-react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer'
import RouteDetailMap from './RouteDetailMap'

export default class RouteDetails extends React.Component {

    constructor(){
        super();
        this.state = {
            favorite: false,
            completed: false
        }
    }


    componentDidMount(){
        this.checkForFavorites() 
        this.checkForCompletes()
    }


    checkForFavorites = () => {
        this.props.favorites.map( favorite => {
          if (favorite.route_id === this.props.bikeRoute.id && favorite.user_id === this.props.userId ){
                 this.setState({
              favorite: true
            })
          } 
        })
      }


      checkForCompletes = () => {
        this.props.completeRoutes.map( comp => {
          if (comp.route_id === this.props.bikeRoute.id ){
                 this.setState({
                  completed: true
                 })
          } 
        })
      }
  


///verify if logged in, and if so, then check if completed or not so we can determine the correct next action 
onCheckmarkClick = (event) => {
    if(this.props.loggedIn === false ){
      alert("You must be logged in to do that.")
    } else {
     //if logged in, then proceed to check if already on favorites
     // and then eitehr create or delete the favorite 
        if(this.state.completed){
          this.markIncomplete(event)
        } else { this.markComplete(event) }
  
          this.setState ({
            completed: !this.state.complete
          })
    }
  }
  /////

//first option, mark that it is now compelted 
markComplete = (event) => {

    let newCompObj = {
      user_id: this.props.userId,
      route_id: this.props.bikeRoute.id,
      completed: true 
    }
  
    fetch('http://localhost:3000/complete_routes', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newCompObj)
      }).then(res => res.json())
      .then( data => {
      
           //and change state socheckmark changes
          this.setState({
               completed: true 
          })
       
         this.props.markCompleted(data)
  
      })
  }
  
  
  
  
  
  
  // second optino, mark it as incomplete. 
  markIncomplete = (event) => {
  
    //find id of complete so I can use it to delete the record 
    let complete = this.props.completeRoutes.filter(fave => fave.route_id === this.props.bikeRoute.id && fave.user_id === this.props.userId )
    let completeId = complete[0].id 
  
    //then i want to Fetch delete from database
    fetch(`http://localhost:3000/complete_routes/${completeId}`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json() )
    .then( res => {
      
        //use callback function to removie from favorites on App state 
        this.props.markIncomplete(completeId)
  
      this.setState({
          completed: false
    })
    })
  
  }













///////////

    onHeartClick = (event) => {
        if(this.props.loggedIn === false ){
          alert("You must be logged in to do that.")
        } else {
         //if logged in, then proceed to check if already on favorites
         // and then eitehr create or delete the favorite 
            if(this.state.favorite){
              this.deleteFavorite(event)
            } else { this.createFavorite(event) }
  
              this.setState ({
                favorite: !this.state.favorite
              })
  
        }
      }


      createFavorite = (event) => {

        //set up new favorite object
        let faveObj = {
          user_id: this.props.userId, 
          route_id: parseInt(event.target.id),
          completed: true  
        }
        
        //do fetch call to persist favorite to database 
        fetch('http://localhost:3000/favorite_routes', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(faveObj)
          }).then(res => res.json())
          .then( data => {
              console.log("created new favorite")  
               //add to favorites array, using callback function on App 
              this.props.addFavorite(data)
  
               //and change state soheart changes
              this.setState({
                   favorite: true 
             })
          })
  
      }
  
  
  
  
      deleteFavorite = (event) => {
             //find the favorite ID
        let fave = this.props.favorites.filter(fave => fave.route_id === this.props.bikeRoute.id && fave.user_id === this.props.userId )
        
        let faveId = fave[0].id 
   
          //then i want to Fetch delete from database
          fetch(`http://localhost:3000/favorite_routes/${faveId}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json() )
        .then( res => {
            this.setState({
                  favorite: false
            })
  
            //use callback function to removie from favorites on App state 
            this.props.removeFavorite(faveId)
        })
      }
  








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

               
            </Container>
            </div>

            <div className="page">
            <div className="page-header">
                <Grid  >
                    <Grid.Column width={3}>

                        <img src={this.props.bikeRoute.image_url} className="ui medium bordered image" />

                        <Segment>
                            <h2>About</h2>
                        <p><b>Distance:</b> {this.props.bikeRoute.length} miles</p>
                        <p><b>Difficulty: </b> {this.props.bikeRoute.difficulty}</p>
                        <p><b>Surface: </b> {this.props.bikeRoute.surface}</p>
                        </Segment>

                        <Button
                        primary 
                        target="_blank"
                        href={this.props.bikeRoute.source}
                        onclick="this.href = this.href.replace('[sub]',window.location)"
                        >View Source</Button>
                        <br />
                        <br />
                        {/* <Button
                        
                        target="_blank"
                        href={this.props.bikeRoute.source}
                        >Edit Route</Button>
                                                <br />
                        <br />
                        <Button
                        red
                        target="_blank"
                        href={this.props.bikeRoute.source}
                        >Delete ROute</Button> */}


                    </Grid.Column>
                    <Grid.Column width={7}>
                    <h1>{this.props.bikeRoute.name}</h1>
                    {/* <a>
                <Icon name='heart' onClick={this.onHeartClick} /> Favorite </a>  | <a>                <Icon name='check circle outline' onClick={this.onCheckMarkClick}  /> Completed
                </a> */}

                <a><Icon size="large" name={this.state.favorite ? 'red heart': 'red heart outline'} red onClick={(event) => this.onHeartClick(event)} id={this.props.bikeRoute.id} /> Favorite</a>&nbsp; &nbsp;{" | "}&nbsp; &nbsp;
 
                <a><Icon size="large" name={this.state.completed ? 'blue check circle': 'check circle outline'}  onClick={(event) => this.onCheckmarkClick(event)} id={this.props.bikeRoute.id} alt="Mark Complete"  />Mark Complete</a>


                    <Divider />
                    <h3>Key Details</h3>
                    <br />
                    {this.props.bikeRoute.description}
                    {/* <Divider />
                    <h1>Tips</h1>
                    {this.props.bikeRoute.tips}
                     */}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Divider />
                       
                        {/* <div className="google-map">
                          <MapContainer />
                        </div> */}
               {/* <img src="https://www.evelo.com/wp-content/uploads/2019/05/050119-google-hero.jpg" className="ui large bordered image" />
                        */}
                        <div className="detail-map-area"> 
                       <RouteDetailMap />
                       </div>
                        <Divider />
                        <h1>REVIEWS</h1>

                        <Divider />
                        <div className="reviews">
                            <RouteComments routeId={this.props.bikeRoute.id} userId={this.props.userId} currentUser={this.props.currentUser} />
                         </div>

                    </Grid.Column>
                </Grid> 
            </div>





           
           



        


                </div>

            </div>
           
        )
    }
}



