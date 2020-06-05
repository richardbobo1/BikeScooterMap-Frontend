import React from 'react'
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react'


 
class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">

    <Header as='h2' color="blue" className="header-logo">
      <Icon name='bicycle' />
      <Header.Content>DC Ridr</Header.Content>
    </Header>
         <div className="ui secondary pointing menu">

            <Link to="/" exact className="item" >Home</Link> 
            <Link to="/explore" exact className="item">Explore Routes</Link> 
            <Link to="/favorites" exact className="item">MyFavRoutes</Link> 
            <Link to="/map" exact className="item">Map</Link> 
        
            <div className="right menu">
                <Link to="/login" exact className="ui item">Login</Link> 
            </div>
        </div>
      </div>
    )
  }

}
 
export default NavBar;