import React from 'react';
import RoutesContainer from './RoutesContainer'
 
class Explore extends React.Component {

    constructor(){
        super();
        this.state = {
            routes: []
          }
    }

    
      componentDidMount(){
        fetch("http://localhost:3000/routes")
        .then(resp => resp.json())
        .then(data => { 
    
            console.log("this is running") 
            console.log(data)
            this.setState({ routes: data})
        })
      }
    



  render() {
    return (
        <div>
            <div className="page-header">
                <h1>Explore Routes
                <button className="ui button" style={{float: "right" }}>+</button>
                </h1>
            </div>

            <div className="routes-container"> 
                <RoutesContainer routes={this.state.routes} />
            </div>
        </div>
    )
  }

}
 
export default Explore;