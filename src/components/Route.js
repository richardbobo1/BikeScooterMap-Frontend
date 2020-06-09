import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Link} from 'react-router-dom'
import { Icon, Card, Button } from 'semantic-ui-react'
import RoutesContainer from './RoutesContainer';


export default class Route extends React.Component{

  constructor(){
    super();
    this.state = {
      favorite: false,
      completed: ""
    }
  }


    componentDidMount(){
    
      //check if route is in favorites array 
      console.log("Fave", this.props.favorites) 
   

      // this.props.favorites.map( favorite => {
      //   if (favorite.id === this.props.route.id ){
      //     this.setState({
      //       favorite: true,
      //       completed: this.props.route.completed 
      //     })
      //   }
      // })
        
    }


    onHeartClick = () => {
        alert("clicked heart")
    }

    onCheckMarkClick = () => {
        alert("clicked Check Mark")
    }

 

    render(){
        return (
            

        
            <Card fluid> 
          
             <img src={this.props.route.google_map} className="card-image" wrapped ui={false} />

        
            <Card.Content>

        
              <Card.Header><Link to={`/bikeroutes/${this.props.route.id}`} > {this.props.route.name}</Link></Card.Header>
            
              <Card.Meta>
                <span className='meta'>
                    {this.props.route.difficulty}, 
                    {this.props.route.surface}
                </span>
              </Card.Meta>
              <Card.Description>
              {this.props.route.short_description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            
              <a><Icon name='heart' onClick={this.onHeartClick} className="heart" /></a>
 
              <a><Icon name='checkmark' onClick={this.onCheckMarkClick} alt="Mark Complete" className="checkmark" /></a>
 
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