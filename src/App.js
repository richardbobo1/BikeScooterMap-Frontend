import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Switch, 
  NavLink 
} from 'react-router-dom';


import Home from './components/Home';
import Explore from './components/Explore';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Map from './components/Map';





class App extends Component {



  render() {
    return (

        <Router>
          <div className="app">
          <NavBar />
          <div className="inner-app">
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route exact path="/explore"><Explore /></Route>     
              <Route exact path="/favorites"><Favorites /></Route>   
              <Route exact path="/login"><Login /></Route>   


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
