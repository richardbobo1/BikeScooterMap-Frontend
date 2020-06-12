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

  componentDidMount(){
    this.setState({
      userId: this.props.userId 
    })
  }



  onCreateJournalEntry = (e) =>{
    let journEntryObj = {
      user_id: this.props.userId,
      date: this.state.date,
      duration: this.state.duration,
      distance: this.state.distance,
      difficulty: this.state.difficulty,
      calories: this.state.calories,
      notes: this.state.notes
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
          notes: "" })


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
        <Modal.Header>Log a Ride</Modal.Header>
        <Modal.Content image>
          {/* <Image wrapped size='medium' src='https://bentonvillear.com/ImageRepository/Document?documentID=2656' /> */}
          <Modal.Description>
            <Header>Tell us about your ride.</Header>

  
  <Form>
    <Form.Group widths='equal'>
    <Form.Field>
          <input type="date" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange} />
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
      <Form.Group widths='equal'>
    <Form.Field>
          <input type="text" placeholder="Duration (in minutes)" name="duration" value={this.state.duration} onChange={this.handleChange}/>
    </Form.Field>
    <Form.Field>
          <input type="text" placeholder="Calories" name="calories" value={this.state.calories} onChange={this.handleChange} />
    </Form.Field>
    </Form.Group>
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
        onClick={this.onCreateJournalEntry}
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