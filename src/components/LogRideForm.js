import React from 'react';
import { Icon, Button, Header, Image, Modal, Form, Dropdown } from 'semantic-ui-react'

// const options = [
//     { key: 'e', text: 'Easy', value: 'easy' },
//     { key: 'm', text: 'Moderate', value: 'moderate' },
//     { key: 'd', text: 'Difficult', value: 'difficult' },
//   ]

//   const surfaceOptions = [
//     { key: 'p', text: 'Paved', value: 'paved' },
//     { key: 'g', text: 'Gravel', value: 'gravel' },
//     { key: 'm', text: 'Mixed', value: 'mixed' },
//   ]



class LogRideForm extends React.Component {

  constructor(){
    super();
    this.state = {
        date: "",
        duration: "",
        distance: "",
        calories: "",
        notes: ""
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
    let bikeRouteObj = {
      name: this.state.name,
      distance: this.state.distance,
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
        this.props.appendNewRoute(bikeRouteObj)
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
        <Button className="ui primary button" onClick={this.handleOpenModal} style={{float: "right" }}>Log a Ride</Button>
        <Modal size="large" open={this.state.open} onClose={this.handleCancel}>
        <Modal.Header>Log a Ride</Modal.Header>
        <Modal.Content image>
          {/* <Image wrapped size='medium' src='https://bentonvillear.com/ImageRepository/Document?documentID=2656' /> */}
          <Modal.Description>
            <Header>Tell us about your ride.</Header>

  
  <Form>
    <Form.Field>
          <input type="text" placeholder="Route Name..." name="name" value={this.state.name} onChange={this.handleChange} />
    </Form.Field>

    <Form.Group widths='equal'>
    <Form.Field>
          <input type="text" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange} />
    </Form.Field>
        <Form.Field>
            <input type="text" name="distance" placeholder="Distance"  onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
        <select fluid id="difficulty" name="difficulty" placeholder="Easy" value={this.state.difficulty} onChange={this.handleChange}>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="difficult">Difficult</option>
        </select>
        </Form.Field>


    </Form.Group>

      {/* description and tips  */}

    <Form.Field>
          <input type="text" placeholder="Duration (HH:MM)" name="duration" value={this.state.duration} onChange={this.handleChange}/>
    </Form.Field>
    <Form.Field>
          <input type="text" placeholder="Distance" name="distance" value={this.state.distance} onChange={this.handleChange}/>
    </Form.Field>
    <Form.Field>
          <input type="text" placeholder="Calories" name="calories" value={this.state.calories} onChange={this.handleChange} />
    </Form.Field>
    <Form.Field>
          <input type="text" placeholder="notes" name="notes" value={this.state.notes} onChange={this.handleChange} />
    </Form.Field>

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
      </Button>
    </Modal.Actions>
 

      </Form>

          </Modal.Description>
        </Modal.Content>
      </Modal>



      </div>
            


    )
   
  }
}
 
export default LogRideForm;