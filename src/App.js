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
import MapContainer from './components/MapContainer';
import MapPage from './components/MapPage';
import RouteDetails from './components/RouteDetails'
import ScrollToTop from './components/ScrollToTop'
import DashboardPage from './components/DashboardPage'





class App extends Component {

  constructor(){
    super();
    this.state = {
        bikeRoutes: [],
        displayedRoutes: [],
        favoriteRoutes: [],
        completeRoutes: [],
        currentUser: null,
        loggedIn: false, 
        userId: 0

      }
}

    componentDidMount(){

      fetch("http://localhost:3000/routes")
      .then(resp => resp.json())
      .then(data => { 
        localStorage.bikeRoutes = JSON.stringify(data)
        this.setState({ bikeRoutes: data})
      })

      if(localStorage.getItem("token") !== null ){
        //fetch request with new route
        fetch('http://localhost:3000/users/decode_token', {
          headers: {
            "Authenticate": localStorage.token
          }
        })
          .then(response => response.json())
          .then(userData => {
            this.updateCurrentUser(userData)
            this.changeLog()
            this.loadUserData()
          }) //update currentuser with signed in user
      }

    
    }

    


      loadUserData = () => {

      //   fetch(`http://localhost:3000/users/${parseInt(localStorage.userId)}`)
      // .then(resp => resp.json())
      // .then(data => { 
      //     this.setState({ 
      //       currentUser: data 
      //     })
      // })
     


      fetch(`http://localhost:3000/favorite_routes/${parseInt(localStorage.userId)}`)
      .then(resp => resp.json())
      .then(data => { 
          this.setState({ 
            favoriteRoutes: data
          })
      })
      



      fetch(`http://localhost:3000/complete_routes/${parseInt(localStorage.userId)}`)
      .then(resp => resp.json())
      .then(data => { 
          this.setState({ 
            completeRoutes: data
          })
      })

    
      }
    
    

  


    updateCurrentUser = (user) => {
      this.setState({
        currentUser: user,
        userId: parseInt(user.id)
      })
      this.loadUserData()
    }





    changeLog = () => {
      this.setState({loggedIn: true,
      
      })
     }



     login = () => {
      this.setState({loggedIn: true,
        })
      this.loadUserData()
     }


     logout = (event) => {
       console.log("logging out")
       localStorage.clear()

      this.setState({
        loggedIn: false,
        currentUser: null,
        userId: '',
        favoriteRoutes: [],
        completeRoutes: []
     })
     console.log("loggout", this.state )

      
     }




     removeFavorite = (faveId) => {
      let newArray = this.state.favoriteRoutes.filter(faveRoute => faveRoute.id !== faveId) 
            this.setState({
                 favoriteRoutes: newArray
           })
     }

     addFavorite =(favoriteObj) => {

      let newArray = [...this.state.favoriteRoutes, favoriteObj] 
      this.setState({
           favoriteRoutes: newArray
     })
     }


     markCompleted = (completedObj) => {
       let newArray = [...this.state.completeRoutes, completedObj]
      this.setState({
        completeRoutes: newArray 
      })
     }

     markIncomplete = (completedObjId) => {
      let newArray = this.state.completeRoutes.filter(compRoute => compRoute.id !== completedObjId) 
      this.setState({
           completeRoutes: newArray
     })

     }







  render() {
    return (
      <div className="page-container">
      
       
        <div id="content-wrap">
        <Router>
          <div className="app">
          <NavBar updateCurrentUser={this.updateCurrentUser} currentUser={this.state.currentUser} changeLog={this.changeLog} loggedIn={this.state.loggedIn} login={this.login} logout={this.logout} />
          <div className="inner-app">
          <ScrollToTop />
            <Switch>
              
              <Route exact="true" path="/" component={Home} />
              <Route exact="true"  path="/explore" render={() => {
                  return (<Explore favorites={this.state.favoriteRoutes} completeRoutes={this.state.completeRoutes}
                              userId={this.state.userId} onHeartClick={this.onHeartClick} 
                              removeFavorite={this.removeFavorite} addFavorite={this.addFavorite}
                              markCompleted={this.markCompleted} markIncomplete={this.markIncomplete}
                              loggedIn={this.state.loggedIn} />)
              }}/>
                
                {/* <Explore favorites={this.state.favoriteRoutes} userId={this.state.userId} /></Route>      */}
              <Route exact="true"  path="/favorites" render={() => this.state.currentUser === null ? <Redirect to="/login" /> :
                  <Favorites favorites={this.state.favoriteRoutes } completedRoutes={this.state.completeRoutes} 
                  userId={this.state.userId}
                  removeFavorite={this.removeFavorite}  addFavorite={this.addFavorite}
                  markCompleted={this.markCompleted} markIncomplete={this.markIncomplete} />   

              } />
 
              <Route exact="true"  path="/map"><MapPage /></Route>   
              <Route exact="true"  path="/dashboard" render={() => this.state.currentUser === null ? <Redirect to="/login" /> :
                  <DashboardPage userId={this.state.userId} currentUser={this.state.currentUser} favoriteRoutes={this.state.favoriteRoutes} completeRoutes={this.state.completeRoutes} /> } 
              />   
             
              <Route exact="true"  path="/login" render={() => 
              <Login currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} changeLog={this.changeLog} logout={this.logout} login={this.login} loggedIn={this.state.loggedIn} />
                
              } />
                 
             
             
              <Route exact="true"  path="/bikeroutes/:id" render= {(routerProps) => { 
                  let id = routerProps.match.params.id
           
                   // need to change this so it doesn't rely on local storage but on state. 
                   let bikeRoute = JSON.parse(localStorage.bikeRoutes).find(p => p.id === parseInt(id))
    
                  localStorage.bikeRoute = JSON.stringify(bikeRoute)
                  return <RouteDetails bikeRoute={JSON.parse(localStorage.bikeRoute)} userId={this.state.userId} 
                      favorites={this.state.favoriteRoutes} completeRoutes={this.state.completeRoutes}
                      markCompleted={this.markCompleted} markIncomplete={this.markIncomplete}
                      removeFavorite={this.removeFavorite} addFavorite={this.addFavorite}
                      currentUser={this.props.currentUser} loggedIn={this.state.loggedIn} />
                  }  }/>


                    {/* <Route render={() => <div>404 Not Found</div>}/>          */}
            </Switch>
            </div>
            </div> 
            </Router>
            </div>
                <Footer />
          
     
     
        </div>
    );
  }

}

export default App;
