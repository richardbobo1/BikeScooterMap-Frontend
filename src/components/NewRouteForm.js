import React from 'react';
import { Icon, Button, Header, Image, Modal, Form, Dropdown, TextArea } from 'semantic-ui-react'



class NewRouteForm extends React.Component {

  constructor(){
    super();
    this.state = {
      open: false,
      name: '',
      length: 0,
      surface: '',
      short_description: '',
      tips: '',
      difficulty: '',
      google_map: '',
      image_url: ''

    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCancel = () => {
    //simply closes for edit reservation confirmation form
    this.setState({ open: false })
  }

  handleOpenModal= () => {
    this.setState({ 
      open: true
   })
}



  onCreateBikeRoute = (e) =>{
  
    let distanceInt = parseInt(this.state.length)

    let bikeRouteObj = {
      name: this.state.name,
      length: parseInt(this.state.length),
      surface: this.state.surface,
      short_description: this.state.short_description,
      difficulty: this.state.difficulty,
      tips: this.state.tips,
      google_map: this.state.google_map,
      image_url: this.state.image_url
    }

    fetch("http://localhost:3000/routes", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bikeRouteObj)
      }).then(res => res.json())
      .then( data => {

        //user callback function to add new bike route to array and DOM
        this.props.appendNewRoute(data)
        //console.log to confirm 
        console.log("Created new bike route", data)
        
    })

    this.handleCancel()
    console.log("Bike obj:", bikeRouteObj)
  }


//trigger={<Button className="ui primary button" onClick={this.handleOpenModal} style={{float: "right" }}>New Route</Button>} 

  render() {
    return (
      <div> 
        <Button className="ui primary button" onClick={this.handleOpenModal}   >New Route</Button>
        <Modal size="small" open={this.state.open} onClose={this.handleCancel}>
        <Modal.Header>Submit a New Route</Modal.Header>
        <Modal.Content >
          {/* <Image wrapped size='medium' src='https://bentonvillear.com/ImageRepository/Document?documentID=2656' />
           */}
          <Modal.Description>
            <Header>Tell us about your route.</Header>
           
  
  <Form>
    <Form.Field>
      <label>Cycling Trail Name (make one up!)</label>
          <input type="text" placeholder="Enter a Descriptive Name..." name="name" value={this.state.name} onChange={this.handleChange} />
    </Form.Field>

    <Form.Group widths='equal'>
        <Form.Field>
          <label>Distance</label>
            <input type="number" name="length" placeholder={20} value={this.state.length} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
        <label>Difficulty</label>
        <select fluid id="difficulty" name="difficulty" placeholder="Easy" value={this.state.difficulty} onChange={this.handleChange}>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
        </select>
        </Form.Field>
        <Form.Field>
        <label>Surface</label>
        <select fluid id="surface" name="surface" placeholder="Paved" value={this.state.surface} onChange={this.handleChange}>
          <option value="Paved">Paved</option>
          <option value="Gravel">Gravel</option>
          <option value="Mixed">Mixed</option>
        </select>
        </Form.Field>

    </Form.Group>

      {/* description and tips  */}
    <Form.Field>
          <label>Short Description</label>
          <TextArea type="textarea" style={{ minHeight: "100px" }} placeholder="Short Description (<50 words)" name="short_description" value={this.state.short_description} onChange={this.handleChange} />
    </Form.Field>
    <Form.Field>
          <label>Tips for Riding</label>
          <input type="text" placeholder="Tips" name="tips" value={this.state.tips} onChange={this.handleChange}/>
    </Form.Field>

    <Form.Field>
    <label>Google Map Image</label>
          <input type="text" placeholder="Google Map Image" name="google_map" value={this.state.google_map} onChange={this.handleChange}/>
    </Form.Field>
    <Form.Field>
    <label>Ride Image</label>
          <input type="text" placeholder="Scenerary Image" name="image_url" value={this.state.image_url} onChange={this.handleChange} />
    </Form.Field>
    </Form>

    </Modal.Description>
        </Modal.Content>

    <Modal.Actions >
      <Button basic negative 
        color='black' 
        icon='remove'
        content='Cancel'
        onClick={this.handleCancel}
        >
      </Button>
      <Button postive 
        color='green' 
        onClick={this.onCreateBikeRoute}
        icon='checkmark'
        labelPosition='right'
        content='Save'
      >
        {/* <Icon name='checkmark'  /> Save */}
      </Button>
    </Modal.Actions>

      </Modal>



      </div>
            


    )
   
  }
}
 
export default NewRouteForm;