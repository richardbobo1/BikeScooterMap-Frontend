import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { Header, Icon, Menu, Container, Image } from 'semantic-ui-react'


 
class NavBar extends React.Component {

    constructor(){
      super();
      this.state = {
          active: "/",
          
      }
    }



  logged = (event) => {
    if(event.target.innerText === "Log In"){
      this.props.history.location.pathname = "/"
      this.props.history.push("login")
    }else{
      localStorage.clear()
      this.props.updateCurrentUser()
      this.props.changeLog()
      this.props.history.location.pathname = "/"

      
    }
  }



  render() {

      return (
        <div className="navbar">
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' exact header>
        <Link to="/">
        <Icon name='map marker alternate' />
        &nbsp; &nbsp; DC BikeScooter Map
          </Link>
        </Menu.Item>
        {/* <Menu.Item as='a' name="home" exact><Link to="/">Home</Link></Menu.Item> */}
        <Menu.Item as='a' exact><Link to="/">Map</Link></Menu.Item>
        <div className="right menu">

         
         {this.props.currentUser === null ? <Menu.Item as='a' key="login" name="login" exact><Link to="/login">Log In</Link></Menu.Item>  :  <Menu.Item key="logout" exact onClick={() => this.props.logout()} ><Link to="/login">Log Out</Link></Menu.Item>

         }
      
      
        
        </div>
        </Container>
    </Menu>
      </div>

      )
    

  }


}
 
export default withRouter(NavBar);