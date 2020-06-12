import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Link} from 'react-router-dom'
import { Icon, Card, Image, Button } from 'semantic-ui-react'


export default class FavRoute extends React.Component{

  constructor(){
    super();
    this.state = {
      favorite: false,
      completed: false,
      favoriteId: 0
    }
  }

    componentDidMount(){
      
      // check if favorite/completed route is in the faves or completed list 
      // update state to true of false 
      
      this.setState({
        favorites: this.props.favorites,
        completeRoutes: this.props.completedRoutes,
        userId: this.props.favorite.user_id 
      })
      
      debugger 
      
      // check if route is in the favorites array, if so, set favorite to true so it can render the heart on the card
      if (this.props.favorites.filter(x => x.route.id === this.props.route.id).length > 0){
        this.setState({
          favorite: true
        })
      }


      // check if route is in the comepleted array, if so, set favorite to true so it can render a checkmark on the card

      if (this.props.completedRoutes.filter(x => x.route.id === this.props.route.id).length > 0){
        this.setState({
          completed: true 
        })
      }

   
    }


   onHeartClick = (event) => {
        event.preventDefault()

        console.log("clicked heart", this.props.favorite.id)

        //if heart is currently true 
        if(this.state.favorite){
          //then i want to Fetch delete from database
          fetch(`http://localhost:3000/favorite_routes/${this.props.favorite.id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json() )
        .then( res => {
            let newArray = this.state.favorites.filter(favoriteObj => favoriteObj.id !== this.props.favorite.id) 
            this.setState({
                 favorites: newArray,
                 favorite: false
           })

           //use callback function to removie from favorites on App state 
           this.props.removeFavorite(this.props.favorite.id)
        })
      } else {

          let newFavoriteObj = {
            user_id: this.state.userId,
            route_id: event.target.id,
            favorite: true 
          }

          fetch('http://localhost:3000/favorite_routes', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newFavoriteObj)
            }).then(res => res.json())
            .then( data => {
                console.log("created new favorite")  
                let newArray = this.state.favorites.push(newFavoriteObj)

                 //and change state soheart changes
                this.setState({
                     favorites: newArray,
                     favorite: true 
               })

               this.props.addFavorite(data)
        
            }
            )

      }
    
        //and then use a callback function to or add to favorites aray 

    }



    onCheckMarkClick = (event) => {
      event.preventDefault()

      console.log("clicked checkmark", this.props.favorite.id)

      //if completed is currently true 
      if(this.state.completed){  

         //then i want to Fetch delete from database
         fetch(`http://localhost:3000/complete_routes/${this.props.favorite.id}`, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.json() )
      .then( res => {
          let newArray = this.state.completeRoutes.filter(compRouteObj => compRouteObj.id !== this.props.favorite.id) 
          this.setState({
               completeRoutes: newArray,
               completed: false
         })

         //use callback function to removie from favorites on App state 
         this.props.markIncomplete(this.props.favorite.id)
      })




      } else {


        let newCompObj = {
          user_id: this.state.userId,
          route_id: event.target.id,
          completed: true 
        }

        fetch('http://localhost:3000/complete_routes', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(newCompObj)
          }).then(res => res.json())
          .then( data => {
              console.log("created new favorite", data )  
              let newArray = this.state.favorites.push(data)

               //and change state soheart changes
              this.setState({
                   completeRoutes: newArray,
                   completed: true 
              })
              debugger 

             this.props.markCompleted(data)
      
          })
        }
      

    }

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
          
             <img src={this.props.route.google_map} className="card-image" wrapped ui={false} />

        
            <Card.Content>

        
              <Card.Header><Link to={`/bikeroutes/${this.props.route.id}`} > {this.props.route.name}</Link></Card.Header>
            
              <Card.Meta>
              <span className='meta'>
                    <span className="card-miles">{this.props.route.length} miles</span> 
                    <span className="card-surface">{this.props.route.surface}</span> 
                </span>
                
              </Card.Meta>
              {/* <Card.Description>
              {this.props.route.short_description}
              </Card.Description> */}
            </Card.Content>
            <Card.Content extra>
            
              <a><Icon name={this.state.favorite ? 'red heart': 'red heart outline'} red onClick={(event) => this.onHeartClick(event)} id={this.props.route.id} className="heart" /></a>
 
              <a><Icon name={this.state.completed ? 'blue check circle': 'check circle outline'}  onClick={(event) => this.onCheckMarkClick(event)} id={this.props.route.id} alt="Mark Complete" className="checkmark" /></a>

            </Card.Content>

          </Card>
   
         
            

        //     <div className="ui card">
        //     <div className="image">
        //         <img src={this.props.route.google_map} className="route-image"/>
        //     </div>
        //     <div className="content">
        //         <a className="header">
        //                 {this.props.route.name}
        //         </a>
        //         <div className="meta">
        //             {this.props.route.difficulty}, {this.props.route.surface}
        //         </div>
        //         <div className="description">
        //             {this.props.route.description}
        //             <br />
        //             <br />
        //             <p>
        //                 <b> {this.props.route.description}  </b>
        //             </p>
        //         </div>

        //     </div>
        //     <div class="extra content">
        //          <div class="ui three buttons">
        //             <div class="ui basic green button">Favorite</div>
        //             <div class="ui basic red button">Decline</div>
             
        //         </div>
        //     </div>

        //         <div class="ui bottom attached button">
        //             <Link to={`/bikeroutes/${this.props.route.id}`} > 
        //                 <Icon name='bicycle' />VIEW ROUTE
        //             </Link>
        //         </div>
           
        // </div>






           
        )
    }

}