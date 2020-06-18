import React from 'react';
import { Icon, Form, Checkbox, Button, Header, Image, Modal,  Dropdown, TextArea, Divider } from 'semantic-ui-react'


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
        notes: "",
        replacedcommute: false,
        transportmode: '',
        dollarssaved: 0,
        tripId: ""
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



  onCreateJournalEntry = (e) =>{

    let journEntryObj = {
      user_id: this.props.userId,
      date: this.state.date,
      duration: parseInt(this.state.duration),
      distance: parseInt(this.state.distance),
      difficulty: this.state.difficulty,
      calories: parseInt(this.state.calories),
      notes: this.state.notes,
      replacedcommute: this.state.replacedcommute,
      transportmode: this.state.transportmode,
      dollarssaved: this.state.dollarssaved,
      trip_id: parseInt(this.state.tripId)
    }

    fetch("http://localhost:3000/journals", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(journEntryObj)
      }).then(res => res.json())
      .then( data => {
        //user callback function to add new bike route to array and DOM
        this.props.appendNewJournalEntry(data)
        this.setState({
          date: "",
          duration: "",
          distance: "",
          difficulty: "",
          calories: "",
          notes: "",
          replacedcommute: false, 
          transportmode: '',
          dollarssaved: 0,
          tripId: ""
        })


        //console.log to confirm 
        console.log("Created new bike route", data)
        
    })

    this.handleCancel()

    console.log("jouranl entry obj obj:", journEntryObj)
  }



//trigger={<Button className="ui primary button" onClick={this.handleOpenModal} style={{float: "right" }}>New Route</Button>} 

  render() {


    return (
      <div> 
        <Button className="ui primary button" onClick={this.handleOpenModal} style={{float: "right" }}>Log a Ride</Button>
        <Modal size="small" open={this.state.open} onClose={this.handleCancel}>
        <Modal.Header>Tell us about your ride.</Modal.Header>
        <Modal.Content image>
          {/* <Image wrapped size='medium' src='https://bentonvillear.com/ImageRepository/Document?documentID=2656' /> */}
          <Modal.Description>
            {/* <Header>Details</Header> */}

  
  <Form>
    <Form.Group widths='equal'>
    <Form.Field>
      <label>Date</label>
          <input type="date" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange} />
    </Form.Field>
        <Form.Field>
        <label>Distance (in miles)</label>
            <input type="text" name="distance" placeholder="Distance"  onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
        <label>How'd the ride feel? </label>
        <select fluid id="difficulty" name="difficulty" placeholder="Easy" value={this.state.difficulty} onChange={this.handleChange}>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
        </select>
        </Form.Field>


    </Form.Group>

      {/* description and tips  */}
      <Form.Group widths='equal'>
    <Form.Field>
        <label>Duration (in minutes)</label>
          <input type="text" placeholder="Duration (in minutes)" name="duration" value={this.state.duration} onChange={this.handleChange}/>
    </Form.Field>
    <Form.Field>
          <label>Calories</label>
          <input type="text" placeholder="Calories" name="calories" value={this.state.calories} onChange={this.handleChange} />
    </Form.Field>


    {this.props.trips.length === 0 ? null : 
                             
                                <Form.Field>
                                <label>Trip</label>
                                <select fluid id="trip" name="tripId" value={this.state.tripId} onChange={this.handleChange}>
                                    <option value="">N/A</option>
                                    {this.props.trips.map(trip => {
                                        return <option value={trip.id}>{trip.trip_name}</option>
                                    })}
                                </select>
                                </Form.Field>
                        
                                
                                }



    </Form.Group>

      <Divider />

    <Header>Environmental Impact</Header>
    <Form.Group widths='equal'> 
      <Form.Field>
        <label>Replaced Driving</label>
        <Checkbox   name="replacedcommute"  value={this.state.replacedcommute} onChange={this.handleCheckBox} />
      </Form.Field>

      <Form.Field>
        <label>Mode of Transport Replaced</label>
        <select fluid name="transportmode"  value={this.state.transportmode} onChange={this.handleChange}>
          <option value="car">N/A</option>
          <option value="car">Car</option>
          <option value="bus">Bus</option>
          <option value="motorcycle">Motorcycle</option>
        </select>
        </Form.Field>

        <Form.Field>
        <label>$ US Dollars Saved</label>
          <input type="number"  placeholder="0" name="dollarssaved" value={this.state.dollarssaved} onChange={this.handleChange}/>
    </Form.Field>
    </Form.Group>
    
    <Divider />

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
        onClick={this.onCreateJournalEntry}
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
 
export default LogRideForm;