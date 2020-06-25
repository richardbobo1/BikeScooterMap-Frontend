import React from 'react';
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
                <Header inverted as="h1" style={{ fontSize: '2.5em' }}>
                Ready to ride. 
                </Header>
                <p className="welcome-paragraph" style={{ fontSize: '1.3em' }}>
                Adventure is out there. Find the adventure in your life with our inspiration, resources, and experiences. 
                A bicycle is simply the mechanism to get there.
                </p>
                <br />
               
                <Link to="/explore" exact className="item"><Button color="primary" size="big" >Let's go.</Button></Link> 
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

                <Icon name='huge map' centered size="large" />
                <Header as="h1">Route Maps</Header>
                <p style={{ fontSize: '1.2em' }}>
                  Search a list of hand curated bike trail maps in the greater DC area. 
                </p>
                <br />
                <Link to="/explore" exact className="item"><Button primary  size="big" >Explore</Button></Link> 
               
              </Grid.Column>
              <Grid.Column>
                {/* <Image
                  centered
                  circular
                  size="small"
                  src="/static/images/wireframe/square-image.png"
                /> */}
                <Icon name='huge bicycle' centered size="large" />
                <Header as="h1">Bike Share</Header>
                <p style={{ fontSize: '1.2em' }}>
                  Capital Bikeshare, JUMP, and Hellbiz. Use our map to find a bikeshares nearby.
                </p>
                <br />
                
                <Link to="/map" exact className="item"><Button primary size="big" > Find Bike</Button></Link>
              </Grid.Column>
              <Grid.Column>
  
                <Icon name='huge chart line' centered size="large" />
                <Header as="h1">My Dashboard</Header>
                <p style={{ fontSize: '1.2em' }}>
                    Keep track of the routes you love and rides you have completed.
                </p>
                <br />
                <Link to="/dashboard" exact className="item"><Button primary size="big" >View Dashboard</Button></Link> 
              </Grid.Column>
            </Grid>
            <br />
            <br />
            <br />
            <br />
            <br />
          </Segment>
        


          <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '1.8em' }}>
              "Better bicycling conditions and transportation choices for a healthier environment."
            </Header>
            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '1.8em' }}>
              "Finally an app that aggregates all of the dockless biking options in one!"
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='https://semantic-ui.com/images/avatar2/large/kristy.png' />
              <b>Nancy</b> An avid rider. 
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>




          <Segment style={{ padding: '4em 0em', }} vertical>
      <Grid container stackable verticalAlign='middle' >
        <Grid.Row>
        <Grid.Column floated='left' width={6}>
            <Image bordered rounded size='large' src='https://d21xlh2maitm24.cloudfront.net/wdc/Cabi4All-Blog.png?mtime=20200225163520' />
          </Grid.Column>

          <Grid.Column width={8}>

            <Header as='h3' style={{ fontSize: '2em' }}>
              Capital Bikeshare for All 
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Capital Bikeshare offers affordable, accessible, and fun transportation options for everyone, regardless of income. Our equity program allows those who qualify for certain state or federal assistance programs to sign up individually, in addition to being able to join through a Community Partner.
            </p>
            <Button size='big' href="https://www.capitalbikeshare.com/pricing/for-all">Check Them Out</Button>
          </Grid.Column>





        </Grid.Row>
      </Grid>
    </Segment>









          <Segment style={{ padding: '4em 0em', }} vertical>
      <Grid container stackable verticalAlign='middle' >
        <Grid.Row>
          <Grid.Column width={8}>

            <Header as='h3' style={{ fontSize: '2em' }}>
              Cycling Advocacy for the DMV
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            WABA is a 501(c)(3) member-supported organization founded in 1972 and serves the Washington, D.C. metropolitan region. WABA educates and advocates in The District of Columbia, Montgomery County; Prince George’s County; Arlington County; Fairfax County; and the city of Alexandria.
            </p>
            <Button size='big' href="https://waba.org/" > Check Them Out</Button>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image rounded size='large' src='https://images.squarespace-cdn.com/content/v1/59738f1b579fb3d3def5277b/1536335489208-0930MY6OBWAN7OKZU6SC/ke17ZwdGBToddI8pDm48kEmALgMyEwAFYhRgMs1vm8cUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcT2mtZKBg7coyLl-TYYHjZOwZPvx3PTs10X7ytEotnc0QIQyskyaHSl_tDOXxjc5w/WABA-Logo-Color-Over-Transparent-1024x488.png' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>





        </div>
      
        )
  };

};
 
export default Home;