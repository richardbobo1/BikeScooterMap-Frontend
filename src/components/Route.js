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

        
    }

    checkForFavorites = () => {
      this.props.favorites.map( favorite => {
        if (favorite.route_id === this.props.route.id ){
               this.setState({
            favorite: true,
            completed: favorite.completed 
          })
        } 
      })
    }

    onHeartClick = (event) => {

      if(this.state.favorite){
        this.deleteFavorite(event)
      } else { this.createFavorite(event) }

        this.setState ({
          favorite: !this.state.favorite
        })
     

    }

    createFavorite = (event) => {
      console.log("Creating favorite", event.target.id  )

      //set up new favorite object
      let faveObj = {
        user_id: this.props.userId, 
        route_id: parseInt(event.target.id),
        completed: this.state.completed 
      }


      //add to favorites array, using callback function on App 


      //do fetch call to persist favorite to database 

      //


    }

    deleteFavorite = (event) => {
      console.log("deleteing favorite", event.id  )
    }


    onCheckMarkClick = () => {
         this.setState ({
          completed: !this.state.completed
        })
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
            
              <a><Icon name={this.state.favorite ? 'red heart': 'red heart outline'} red onClick={(event) => this.onHeartClick(event)} id={this.props.route.id} className="heart" /></a>
 
              <a><Icon name={this.state.completed ? 'blue check circle': 'check circle outline'}  onClick={(event) => this.onCheckMarkClick(event)} alt="Mark Complete" className="checkmark" /></a>
 
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