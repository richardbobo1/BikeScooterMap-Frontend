import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Switch, 
  NavLink, 
  Redirect
} from 'react-router-dom';


import Home from './components/Home';
import Explore from './components/Explore';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import MapContainer from './components/Map';
import RouteDetails from './components/RouteDetails'
import ScrollToTop from './components/ScrollToTop'






class App extends Component {

  constructor(){
    super();
    this.state = {
        bikeRoutes: [],
        displayedRoutes: [],
        favoriteRoutes: [],
        currentUser: null,
        loggedIn: false ,
        userId: 1

      }
}

    componentDidMount(){



      fetch("http://localhost:3000/routes")
      .then(resp => resp.json())
      .then(data => { 
  
        localStorage.bikeRoutes = JSON.stringify(data)

      
        this.setState({ bikeRoutes: data})
      })



      fetch("http://localhost:3000/routes", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
      .then(resp => resp.json())
      .then(data => { 
  
        localStorage.bikeRoutes = JSON.stringify(data)

      
        this.setState({ bikeRoutes: data})
      })



      ///get favorite routes once loggedIn

        fetch(`http://localhost:3000/favorite_routes/${this.state.userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        })
        .then(resp => resp.json())
        .then(data => { 
          
          let favArray = []
          data.map( fav => {
            favArray.push(fav)
          })

          this.setState({ favoriteRoutes: favArray })
          console.log("favorite routes:", this.state.favoriteRoutes) 
        })

    }
  

    updateCurrentUser = (user) => {
      console.log(user)
      this.setState({currentUser: user})
    }

    changeLog = () => {
      this.setState({loggedIn: !this.state.loggedIn})
     }



  render() {
    return (

        <Router>
          <div className="app">
          <NavBar updateCurrentUser={this.updateCurrentUser} changeLog={this.changeLog}  />
          <div className="inner-app">
          <ScrollToTop />
            <Switch>
              
              <Route exact path="/"><Home /></Route>
              <Route exact path="/explore"><Explore favorites={this.state.favoriteRoutes} userId={this.state.userId} /></Route>     
              <Route exact path="/favorites"><Favorites /></Route>   
              <Route exact path="/map"><MapContainer /></Route>   
              <Route exact path="/login" ><Login currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} changeLog={this.changeLog} loggedIn={this.state.loggedIn} /></Route>   
              <Route exact path="/bikeroutes/:id" render= {(routerProps) => { 
                  let id = routerProps.match.params.id
           
                   // need to change this so it doesn't rely on local storage but on state. 
                   let bikeRoute = JSON.parse(localStorage.bikeRoutes).find(p => p.id === parseInt(id))
    
                  localStorage.bikeRoute = JSON.stringify(bikeRoute)
                  return <RouteDetails bikeRoute={JSON.parse(localStorage.bikeRoute)}  />
                  }  }/>


                    {/* <Route render={() => <div>404 Not Found</div>}/>          */}
            </Switch>
            </div>

                <Footer />
          </div>
        </Router>
    );
  }

}

export default App;
