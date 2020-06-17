import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Link} from 'react-router-dom'
import { Icon, Card, Button } from 'semantic-ui-react'
import RoutesContainer from './RoutesContainer';



export default class Route extends React.Component{

  constructor(){
    super();
    this.state = {
      favoriteRoutes: [], 
      favorite: false,
      completed: false 
    }
  }


    componentDidMount(){

      //check if route is in favorites array 
      this.setState({
        favoriteRoutes: this.props.favorites 
      })
      this.checkForFavorites() 
      this.checkForCompletes()
        
    }

    checkForFavorites = () => {
      this.props.favorites.map( favorite => {
        if (favorite.route_id === this.props.route.id ){
               this.setState({
            favorite: true
          })
        } 
      })
    }


    checkForCompletes = () => {
      
      this.props.completeRoutes.map( comp => {

        if (comp.route_id === this.props.route.id ){
               this.setState({
                completed: true
               })
        } 
      })
    }




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
      console.log("Creating favorite", event.target.id  )

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
      console.log("deleteing favorite", event.id  )
        //find the favorite ID
      let fave = this.props.favorites.filter(fave => fave.route_id === this.props.route.id && fave.user_id === this.props.userId )
      
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





///////////////////////////


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
    route_id: this.props.route.id,
    completed: true 
  }

  fetch('http://localhost:3000/complete_routes', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newCompObj)
    }).then(res => res.json())
    .then( data => {
    
        console.log("created new favorite", data )  
         //and change state soheart changes
        this.setState({
             completed: true 
        })
     
       this.props.markCompleted(data)

    })
}






// second optino, mark it as incomplete. 
markIncomplete = (event) => {

  //find id of complete so I can use it to delete the record 
  let complete = this.props.completeRoutes.filter(fave => fave.route_id === this.props.route.id && fave.user_id === this.props.userId )
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


////////









    //////////////////////////////////

    render(){
      
      let xColor = "green" 

      if(this.props.route.difficulty === "Difficult"){
        xColor = "#DC143C"
      } else if (this.props.route.difficulty === "Moderate") {
        xColor = "#87CEEB" 
      } else {
        xColor = "#66CDAA" 
      }
      

        return (
            

        
            <Card fluid> 
             <div className="difficulty-div" style={{background: xColor }} >
                <h4>{this.props.route.difficulty}</h4>
              </div> 
             <img src={this.props.route.image_url} className="card-image" wrapped ui={false} />

        
            <Card.Content>

        
              <Card.Header><Link to={`/bikeroutes/${this.props.route.id}`} > {this.props.route.name}</Link></Card.Header>
            
              <Card.Meta>
                <span className='meta'>
                    <span className="card-miles">{this.props.route.length} miles</span> 
                    <span className="card-surface">{this.props.route.surface}</span> 
                </span>
              </Card.Meta>
              {/* <Card.Description>
           
              </Card.Description> */}
            </Card.Content>
            <Card.Content extra>
            
              <a><Icon size="large" name={this.state.favorite ? 'red heart': 'red heart outline'} red onClick={(event) => this.onHeartClick(event)} id={this.props.route.id} className="heart" /></a>
 
              <a><Icon size="large" name={this.state.completed ? 'blue check circle': 'check circle outline'}  onClick={(event) => this.onCheckmarkClick(event)} alt="Mark Complete" className="checkmark" /></a>
 
            </Card.Content>

            <div className="ui bottom attached button">
                    <Link to={`/bikeroutes/${this.props.route.id}`} > 
                        <Icon name='bicycle' />VIEW ROUTE
                    </Link>
                </div>

          </Card>
   



            







           
        )
    }

}