import React from 'react';
import { Icon, Form, Checkbox, Button, Header, Image, Modal,  Dropdown, TextArea, Divider } from 'semantic-ui-react'


class NewTripForm extends React.Component {

  constructor(){
    super();
    this.state = {
        tripName: "",
        startDate: "",
        endDate: "",
        notes: "",
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckBox = (e) => {
    this.setState({ replacedcommute: !this.state.replacedcommute})
  }

  handleCancel = () => {
    //simply closes for edit reservation confirmation form
    this.setState({ open: false })
  }

  handleOpenModal= () => {
    this.setState({ 
      open: true
   })
  }

  componentDidMount(){
    this.setState({
      userId: this.props.userId 
    })
  }



  onCreateTrip = (e) =>{

    let tripObj = {
      user_id: this.props.userId,
      trip_name: this.state.tripName,
      trip_start: this.state.startDate,
      trip_end: this.state.endDate,
      notes: this.state.notes 
    }


    fetch("http://localhost:3000/trip", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(tripObj)
      }).then(res => res.json())
      .then( data => {
        //user callback function to add new bike route to array and DOM
        this.props.appendNewtrip(data)

        //reset state
        this.setState({
            trip_name: "",
            trip_start: "",
            trip_end: "",
            notes: ""
        })


        //console.log to confirm 
        console.log("Created new bike route", data)
        
    })

    this.handleCancel()

    console.log("trip info:", tripObj)
  }



//trigger={<Button className="ui primary button" onClick={this.handleOpenModal} style={{float: "right" }}>New Route</Button>} 

  render() {


    return (
      <div> 
        <Button className="ui primary button" onClick={this.handleOpenModal}  style={{float: "right" }}>New Trip</Button>
        <Modal size="small" open={this.state.open} onClose={this.handleCancel}>
        <Modal.Header>Tell us about your trip</Modal.Header>
        <Modal.Content image>
          {/* <Image wrapped size='medium' src='https://bentonvillear.com/ImageRepository/Document?documentID=2656' /> */}
          <Modal.Description>
            {/* <Header>Details</Header> */}

  
  <Form>

  <Form.Group widths='equal'>
    <Form.Field>
          <label>Trip Name</label>
          <input type="text" placeholder="Ex: DC to Richmond" name="tripName" value={this.state.tripName} onChange={this.handleChange} />
    </Form.Field>
    </Form.Group>



    <Form.Group widths='equal'>
    <Form.Field>
      <label>Start Date</label>
          <input type="date" placeholder="Date" name="startDate" value={this.state.startDate} onChange={this.handleChange} />
    </Form.Field>
    <Form.Field>
      <label>End Date</label>
          <input type="date" placeholder="Date" name="endDate" value={this.state.endDate} onChange={this.handleChange} />
    </Form.Field>

    </Form.Group>

    <Header>Notes</Header>
    <Form.Field>
          <TextArea type="textarea" placeholder="Any notes on how the ride went? How'd you feel? " name="notes" value={this.state.notes} onChange={this.handleChange} />
          {/* <input type="textarea" placeholder="notes" name="notes" value={this.state.notes} onChange={this.handleChange} /> */}
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
        onClick={this.onCreateTrip}
        icon='checkmark'
        labelPosition='right'
        content='Save'
      >
      </Button>
    </Modal.Actions>
 

   
       
      </Modal>



      </div>
            


    )
   
  }
}
 
export default NewTripForm;