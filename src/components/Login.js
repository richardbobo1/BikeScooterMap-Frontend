import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'

 
export default class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            image_url: "",
            email: "",
            signIn: true
          };
    }




      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };


      onSignUp = (e) => {
        console.log("clickity clik")
        e.preventDefault()

        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: this.state.username,
                password: this.state.password,
                img_url: this.state.image_url,
                email: this.state.email 
              }
            })
          })
            .then(r => r.json())
            .then(userData => {
                    console.log("response from the server", userData)
                    if(userData.error_message){
                      alert("There are errors in the form, fix them")
                    }else{
                      debugger
                      localStorage.setItem("token", userData.jwt)
                      localStorage.setItem("user", userData.user)   //added this to store current user 
                      this.props.updateCurrentUser(userData.user)   
                    }
            })
    }




    handleLoginSubmit = (e) => {
        e.preventDefault()
        if(this.state.signIn){
            fetch("http://localhost:3000/api/v1/login", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                  },
                body: JSON.stringify({
                    user: {
                        username: this.state.username,
                        password: this.state.password
                    }
                })
            }).then(res => res.json())
            .then(userData => {
                console.log("response from the server", userData)
                if(userData.error_message){
                    alert(userData.error_message)
                }else{
                    localStorage.setItem("token", userData.jwt)
                        localStorage.setItem("user", userData.user)   //added this to store current user 
                        this.props.updateCurrentUser(userData.user)   
                        this.props.changeLog()
                    }
            })
        }
    }
        


    handleSignUp = (e) => {
          fetch("http://localhost:3000/api/v1/users", {
        method:"POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          "user": {
          username: this.state.username,
          password: this.state.password,
          img_url: this.state.image_url,
          email: this.state.email 
          }
        })
      }).then(res => res.json())
      .then(userData => {
        console.log("response from the server", userData)
        if(userData.error_message){
          alert("There are errors in the form, fix them")
        }else{
          debugger
          localStorage.setItem("token", userData.jwt)
          localStorage.setItem("user", userData.user)   //added this to store current user 
          this.props.updateCurrentUser(userData.user)   
          this.props.changeLog()
        }
      })
        }

      

      handleSign = (event) => {
        this.setState({signIn: !this.state.signIn})
      }


    // render(){
    //     return  <Button onClick={event => this.onPostFetch(event)} >Create user</Button>
    //  }

    render() {

        if(this.state.signIn) {

            return (
                    <div> 

                 <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                     <Grid.Column style={{ maxWidth: 450 }}>
                     <Header as='h2' color='teal' textAlign='center'>
                     <Icon name='bicycle' /> Log-in to your account
                     </Header>

                     <Form className="ui form" onSubmit={this.handleLoginSubmit} size='large'>
                     <Segment stacked>
                    
                
                     <Form.Input fluid icon='user' iconPosition='left' name="username" placeholder='Enter your username...' value={this.state.username} onChange={this.handleChange} />
                     <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            value={this.state.password} onChange={this.handleChange}
                        />
                            <Button color='teal' fluid size='large' type="submit">
                            Login
                            </Button>
                    </Segment> 
                    </Form>

                    <Message>
                    New to us? <a href='#' onClick={this.handleSign}>Sign Up</a>
                    </Message>

                </Grid.Column>
            </Grid> 
            </div>
        )}

        else { 
            return(
                    <div>

                    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                    <Icon name='bed' /> Create Your Account!
                    </Header>

                    <Form className="ui form" onSubmit={this.onSignUp} size='large'>
                    <Segment stacked>
                    
                
                    <Form.Input fluid icon='user' iconPosition='left' name="email" placeholder='Enter your email...' value={this.state.email} onChange={this.handleChange} />
                    <Form.Input fluid icon='user' iconPosition='left' name="username" placeholder='Enter your username...' value={this.state.username} onChange={this.handleChange} />

                    <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            value={this.state.password} onChange={this.handleChange}
                        />

                        
                        <Form.Input fluid icon='user' iconPosition='left' name="image_url" placeholder='Enter your image...' value={this.state.image_url} onChange={this.handleChange} />
                     
                            <Button color='teal' fluid size='large' type="submit">
                            Sign Up
                            </Button>
                    </Segment> 
                    </Form>

                    <Message>
                    Have an Account? <a href='#' onClick={this.handleSign}>Log In</a>
                    </Message>

                </Grid.Column>
            </Grid> 


            </div>

          )}
    }
}

