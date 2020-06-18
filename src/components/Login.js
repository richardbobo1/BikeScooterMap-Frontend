import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Switch, 
  NavLink, 
  Redirect
} from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react'


export default class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            signIn: true
          };
    }

    componentDidMount(){
      
    }
    



      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };


      onSignUp = (e) => {
         e.preventDefault()

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "user": {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email 
              }
            })
          })
            .then(r => r.json())
            .then(userData => {
              debugger
                    console.log("response from the server", userData)
                    if(userData.error_message){
                      alert("There are errors in the form, fix them")
                    }else{
                      localStorage.setItem("token", userData.jwt)
                      localStorage.setItem("userId", userData.user_data.id) 
                      localStorage.setItem("user", userData.user_data)   //added this to store current user 
                      this.props.updateCurrentUser(userData.user_data)   
                      // this.props.login()
                      this.props.changeLog()
                      window.location = "/"
                     
                    }
            })
         
    }


    handleLoginSubmit = () => {

      fetch("http://localhost:3000/login", {
          method:"POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
      })
      .then((response) => response.json())
      .then(data => {

        

          console.log("response", data)
          if (data.error_message){
              alert(data.error_message)
          }else {
              localStorage.setItem("token", data.token)
              localStorage.setItem("userId", data.user_data.id) 
 

              this.props.updateCurrentUser(data.user_data)   
              // this.props.login()
              this.props.changeLog()
              window.location = "/"



          }
      })
  }
        



      

      handleSign = (event) => {
        this.setState({signIn: !this.state.signIn})
      }




    render() {



        if(this.state.signIn) {

            return (
                 

                 <Grid textAlign='center' style={{ height: '100vh', margin: "200px 0px 0px 0px" }}  >
                     <Grid.Column style={{ maxWidth: 450 }}>
                     <Header as='h2' color='blue' textAlign='center'>
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
                            <Button color='blue' fluid size='large' type="submit">
                            Login
                            </Button>
                    </Segment> 
                    </Form>

                    <Message>
                    New to us? <a href='#' onClick={this.handleSign}>Sign Up</a>
                    </Message>

                </Grid.Column>
            </Grid> 
         
        )}

        else { 
            return(
                  
                    <Grid textAlign='center' style={{ height: '20vh', margin: "200px" }} >
                    <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='blue' textAlign='center'>
                    <Icon name='bicycle' /> Create Your Account!
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


                            <Button color='blue' fluid size='large' type="submit">
                            Sign Up
                            </Button>
                    </Segment> 
                    </Form>

                    <Message>
                    Have an Account? <a href='#' onClick={this.handleSign}>Log In</a>
                    </Message>

                </Grid.Column>
            </Grid> 


          

          )}
    }
}

