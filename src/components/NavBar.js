import React from 'react'
import { Link } from 'react-router-dom';
import { Header, Icon, Menu, Container, Image } from 'semantic-ui-react'


 
class NavBar extends React.Component {

    constructor(){
      super();
      this.state = {
          active: "/",
          
      }
    }


  logged = (event) => {
    debugger
    if(event.target.innerText === "Log In"){
      this.props.history.location.pathname = "/"
      this.props.history.push("home")
    }else{
      localStorage.clear()
      this.props.updateCurrentUser(null)
      this.props.changeLog()
      // this.props.history.location.pathname = "/"

      
    }
  }



  render() {
    return (
    <div className="navbar">


    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' href="/" exact header>
      
        <Icon name='bicycle' />
          DC Ridr
       
        </Menu.Item>
        <Menu.Item as='a' href="/" exact>Home</Menu.Item>
        <Menu.Item as='a' href="/explore" exact>Explore</Menu.Item>
        <Menu.Item as='a' href="/favorites" exact>My Trails</Menu.Item>
        <Menu.Item as='a' href="/map" exact>Map</Menu.Item>
        <div className="right menu">
          <Menu.Item as='a' href="/dashboard" exact>Dashboard</Menu.Item>
          <Menu.Item as='a' href="/login" exact>Login</Menu.Item>
        </div>
        </Container>
    </Menu>

  
  {/* <div className="header-logo">
    <Header as='h2' color="blue" fixed className="header-logo">
      <Icon name='bicycle' />
      <Header.Content>DC Ridr</Header.Content>
    </Header>
    </div>
         <div className="ui secondary pointing menu">

            <Link to="/" exact className="item">Home</Link> 
            <Link to="/explore" exact className="item">Explore Routes</Link> 
            <Link to="/favorites" exact className="item">MyFavRoutes</Link> 
            <Link to="/map" exact className="item">Map</Link> 
        
            <div className="right menu">
            <Link to="/dashboard" exact className="item">Dashboard</Link> 
              <Link to="/login" exact className="ui item" onClick={(event) =>  {this.logged(event)}} >{this.props.loggedIn === false ? "Log In" : "Log Out"}</Link> 
            </div>
        </div> */}
       

      </div>
    )
  }

}
 
export default NavBar;