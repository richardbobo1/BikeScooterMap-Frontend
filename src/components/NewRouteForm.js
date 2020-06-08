import React from 'react';
import { Button, Header, Image, Modal, Form, Dropdown } from 'semantic-ui-react'

const options = [
    { key: 'e', text: 'Easy', value: 'easy' },
    { key: 'm', text: 'Moderate', value: 'moderate' },
    { key: 'd', text: 'Difficult', value: 'difficult' },
  ]

  const surfaceOptions = [
    { key: 'p', text: 'Paved', value: 'paved' },
    { key: 'g', text: 'Gravel', value: 'gravel' },
    { key: 'm', text: 'Mixed', value: 'Mixed' },
  ]



class NewRouteForm extends React.Component {
  render() {
    return (
        <Modal trigger={<Button className="ui primary button" style={{float: "right" }}>New Route</Button>}>
        <Modal.Header>Submit a New Route</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://bentonvillear.com/ImageRepository/Document?documentID=2656' />
          <Modal.Description>
            <Header>Tell us about your route.</Header>

  
  <Form>
    <Form.Field>
          <input type="text" placeholder="Route Name..." />
    </Form.Field>

    <Form.Group widths='equal'>
        <Form.Field>
            <input type="text" placeholder="Distance" />
        </Form.Field>
        <Form.Select
            fluid
            options={options}
            placeholder='Easy'
          />
                  <Form.Select
            fluid
            options={surfaceOptions}
            placeholder='Paved'
          />
    </Form.Group>

      {/* description and tips  */}
    <Form.Field>
          <input type="text" placeholder="Short Description (<50 words)" />
    </Form.Field>
    <Form.Field>
          <input type="text" placeholder="Tips" />
    </Form.Field>

        {/* images  */}
        <label>Images</label>
    <Form.Field>
          <input type="text" placeholder="Google Map Image" />
    </Form.Field>
    <Form.Field>
          <input type="text" placeholder="Scenerary Image" />
    </Form.Field>


 
        <br />
      <div className="ui submit button">Submit</div>
      </Form>

          </Modal.Description>
        </Modal.Content>
      </Modal>




            


    )
   
  }
}
 
export default NewRouteForm;