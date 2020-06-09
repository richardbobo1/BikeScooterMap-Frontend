import React, { Component } from "react";
import ReactDOM from "react-dom";
import RoutesContainer from './RoutesContainer'
import NewRouteForm from './NewRouteForm'
import { Grid, Search, Button, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


 
class Explore extends React.Component {

    constructor(){
        super();
        this.state = {
            routes: [],
            show: false
          }
    }


    //modal will be the new route form 
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    
      componentDidMount(){
        fetch("http://localhost:3000/routes", {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.token}`
            }
          })
        .then(resp => resp.json())
        .then(data => { 
    
            console.log("this is running") 
            console.log(data)
            this.setState({ routes: data})
        })
      }
    



  render() {
    return (
        <div className="page">
            <div className="page-header">
                <Grid>
                    <Grid.Column width={6}>
                        <h1>Explore Routes</h1>
                    </Grid.Column>
                    <Grid.Column width={4}>
                            <Search    />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                            <NewRouteForm />
                        </Modal>
                    <NewRouteForm onClick={this.showModal} style={{float: "right" }} />
                        
                    </Grid.Column>
                </Grid> 
            </div>


            <div className="routes-container"> 
                <RoutesContainer favorites={this.props.favoriteRoutes} routes={this.state.routes} />
            </div>
        </div>
    )
  }

}
 
export default Explore;