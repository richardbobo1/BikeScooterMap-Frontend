import React from 'react';
import { Icon, Button, Header, Image, Modal, Form, Dropdown } from 'semantic-ui-react'




class EditJournalLogForm extends React.Component {

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
      user_id: this.props.journal.user_id,
      journalId: this.props.journal.id,
      date: this.props.journal.date,
      duration: this.props.journal.duration,
      distance: this.props.journal.distance,
      calories: this.props.journal.calories,
      notes: this.props.journal.notes 
    })
  }



  onCreateJournalEntry = (e) =>{
    let journEntryObj = {
      user_id: this.props.journal.user_id,
      date: this.state.date,
      duration: this.state.duration,
      distance: this.state.distance,
      difficulty: this.state.difficulty,
      calories: this.state.calories,
      notes: this.state.notes
    }

    console.log("creating edit", journEntryObj)
    // fetch("http://localhost:3000/journals", {
    //   method: 'POST',
    //   headers: {"Content-Type": "application/json"},
    //   body: JSON.stringify(journEntryObj)
    //   }).then(res => res.json())
    //   .then( data => {
    //     //user callback function to add new bike route to array and DOM
    //     this.props.appendNewJournalEntry(data)
    //     this.setState({
    //       date: "",
    //       duration: "",
    //       distance: "",
    //       difficulty: "",
    //       calories: "",
    //       notes: "" })


    //     //console.log to confirm 
    //     console.log("Created new bike route", data)
        
    // })

    this.handleCancel()

  }


//trigger={<Button className="ui primary button" onClick={this.handleOpenModal} style={{float: "right" }}>New Route</Button>} 

  render() {
    return (
      <> 
        <Icon className="compose" onClick={this.handleOpenModal} />
        <Modal size="small" open={this.state.open} onClose={this.handleCancel}>
        <Modal.Header>Edit This Ride</Modal.Header>
        <Modal.Content image>
          {/* <Image wrapped size='medium' src='https://bentonvillear.com/ImageRepository/Document?documentID=2656' /> */}
          <Modal.Description>
            

  
  <Form>
    <Form.Group widths='equal'>
    <Form.Field>
            <label>Date</label>
          <input type="date" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange} />
    </Form.Field>
        <Form.Field>
        <label>Distance</label>
            <input type="text" name="distance" placeholder="Distance" value={this.state.distance} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
        <label>Difficulty</label>
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
        <label>Duration</label>
          <input type="text" placeholder="Duration (in minutes)" name="duration" value={this.state.duration} onChange={this.handleChange}/>
    </Form.Field>
    <Form.Field>
        <label>Calories</label>
          <input type="text" placeholder="Calories" name="calories" value={this.state.calories} onChange={this.handleChange} />
    </Form.Field>
    </Form.Group>
    <Form.Field>
         <label>Notes</label>
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



      </>
            


    )
   
  }
}
 
export default EditJournalLogForm;