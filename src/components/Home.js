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
                <p className="welcome-paragraph">
                Adventure is out there. Find the adventure in your life with our inspiration, resources, and experiences. 
                A bicycle is simply the mechanism to get there.
                </p>
               
                <Link to="/explore" exact className="item"><Button color="teal" >Let's go.</Button></Link> 
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

                <Icon name='map' centered size="large" />
                <Header as="h1">Route Maps</Header>
                <p>
                  Donec sed odio dui. Etiam porta sem malesuada magna mollis
                  euismod. Nullam id dolor id nibh ultricies vehicula ut id
                  elit. 
                </p>
                <Link to="/explore" exact className="item"><Button primary >Explore &raquo;</Button></Link> 
               
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
                  euismod. Nullam id dolor id.
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
                <Icon name='chart line' centered size="large" />
                <Header as="h1">My Dashboard</Header>
                <p>
                    Keep track of the routes you love or have completed by marketing 
                    them as favorites or compled......

                  Donec sed odio dui. Etiam porta sem malesuada magna mollis
                  euismod. 
                </p>

                <Link to="/dashboard" exact className="item"><Button primary >View my dashboard &raquo;</Button></Link> 
              </Grid.Column>
            </Grid>
          </Segment>
        

        </div>
      
        )
  };

};
 
export default Home;