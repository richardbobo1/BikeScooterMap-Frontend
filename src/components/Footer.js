import React from 'react';
import { Header, Icon, Menu, Container, Image } from 'semantic-ui-react'
 
class Footer extends React.Component {
  render() {
    return (
      <footer id="footer">
        <div className="footer">
        <div className="footer-text"> <Icon name="bicycle" />DC Ridr © 2020</div>
        </div>
        </footer>
        )
  };
};
 
export default Footer;