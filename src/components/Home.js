import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import "semantic-ui-css/semantic.min.css";

import {
  Button,
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment
} from "semantic-ui-react";
 
class Home extends React.Component {
  
    render() {

        const slickSettings = {
            autoplay: true,
            dots: true,
            speed: 500
          };

    return (
        <div>
            <div className="welcome-header" >
            <Container className="content">
                <Header inverted as="h1">
                Ready to ride. 
                </Header>
                <p>
                Cover is a one-page template for building simple and beautiful
                home pages. Download, edit the text, and add your own fullscreen
                background photo to make it your own.
                </p>
                <Button size="huge">Let's go.</Button>
            </Container>
            </div>
       
          <Segment vertical>
            <Grid container stackable textAlign="center" columns={3}>
              <Grid.Column>
                {/* <Image
                  centered
                  circular
                  size="small"
                  src="/static/images/wireframe/square-image.png"
                /> */}

                <Icon name='bicycle' centered size="large" />
                <Header as="h1">Route Maps</Header>
                <p>
                  Donec sed odio dui. Etiam porta sem malesuada magna mollis
                  euismod. Nullam id dolor id nibh ultricies vehicula ut id
                  elit. Morbi leo risus, porta ac consectetur ac, vestibulum at
                  eros. Praesent commodo cursus magna.
                </p>
                <Link to="/explore" exact className="item"><Button primary >View details &raquo;</Button></Link> 
               
              </Grid.Column>
              <Grid.Column>
                {/* <Image
                  centered
                  circular
                  size="small"
                  src="/static/images/wireframe/square-image.png"
                /> */}
                <Icon name='bicycle' centered size="large" />
                <Header as="h1">Bike Share</Header>
                <p>
                  If you want to use Capital Bike Share, JUMP, or Hellbiz, use our map to find a bikeshare bike nearby in Washington, DC. 

                  ......Donec sed odio dui. Etiam porta sem malesuada magna mollis
                  euismod. Nullam id dolor id nibh ultricies vehicula ut id
                  elit. Morbi leo risus, porta ac consectetur ac, vestibulum at
                  eros. Praesent commodo cursus magna.
                </p>
                
                <Link to="/map" exact className="item"><Button primary > Find A Bike &raquo;</Button></Link>
              </Grid.Column>
              <Grid.Column>
                {/* <Image
                  centered
                  circular
                  size="small"
                  src="/static/images/wireframe/square-image.png"
                /> */}
                <Icon name='bicycle' centered size="large" />
                <Header as="h1">My Routes</Header>
                <p>
                    Keep track of the routes you love or have completed by marketing 
                    them as favorites or compled......

                  Donec sed odio dui. Etiam porta sem malesuada magna mollis
                  euismod. Nullam id dolor id nibh ultricies vehicula ut id
                  elit. Morbi leo risus, porta ac consectetur ac, vestibulum at
                  eros. Praesent commodo cursus magna.
                </p>

                <Link to="/favorites" exact className="item"><Button primary >View my routes &raquo;</Button></Link> 
              </Grid.Column>
            </Grid>
          </Segment>
        

        </div>
      
        )
  };

};
 
export default Home;