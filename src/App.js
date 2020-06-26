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
import Login from './components/Login';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import MapContainer from './components/MapContainer';
import MapPage from './components/MapPage';
import ScrollToTop from './components/ScrollToTop'






class App extends Component {

  constructor(){
    super();
    this.state = {
        currentUser: null,
        loggedIn: false, 
        userId: 0

      }
}

    componentDidMount(){

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

        fetch(`http://localhost:3000/users/${parseInt(localStorage.userId)}`)
      .then(resp => resp.json())
      .then(data => { 
          this.setState({ 
            currentUser: data 
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
      this.setState({loggedIn: true })
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
              
              {/* <Route exact="true" path="/" component={Home} /> */}
 
              <Route exact="true"  path="/"><MapPage /></Route>   
              <Route exact="true"  path="/login" render={() => 
              <Login currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} changeLog={this.changeLog} logout={this.logout} login={this.login} loggedIn={this.state.loggedIn} />
                
              } />
                 
            
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
