import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Link} from 'react-router-dom'
import { Icon, Card, Image, Button } from 'semantic-ui-react'


export default class FavRoute extends React.Component{


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


            {/* <Image src={this.props.route.google_map}  wrapped ui={false} /> */}
        
            <Card.Content>

        
              <Card.Header><Link to={`/bikeroutes/${this.props.route.id}`} > {this.props.route.name}</Link></Card.Header>
            
              <Card.Meta>
                <span className='meta'>{this.props.route.difficulty}, {this.props.route.surface}</span>
              </Card.Meta>
              <Card.Description>
              {this.props.route.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            
              <a><Icon name='heart' onClick={this.onHeartClick} className="heart" /></a>
 
              <a><Icon name='checkmark' onClick={this.onCheckMarkClick} alt="Mark Complete" className="checkmark" /></a>
 
              
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