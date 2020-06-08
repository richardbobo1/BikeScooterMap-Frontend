import React from 'react';
import { Form, Checkbox} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
 
class MapFilterForm extends React.Component {
  render() {
    return (
        <>
        
  
        <Form>
        <Form.Field>
          Companies:
        </Form.Field>
        <Form.Field>
          <Checkbox
            toggle 
            label='CapBike Share'
            name='checkboxRadioGroup'
            value='cap'
            defaultChecked = 'true'
            // checked={this.state.value === 'this'}
            // onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            toggle 
            label='JUMP Bikes'
            name='checkboxRadioGroup'
            value='jump'
            defaultChecked = 'true'
            // checked={this.state.value === 'that'}
            // onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            toggle 
            label='Hellbiz Bikes'
            name='checkboxRadioGroup'
            value='hellbiz'
            defaultChecked = 'true'
            // checked={this.state.value === 'that'}
            // onChange={this.handleChange}
          />
        </Form.Field>
      </Form>



</>

    )
   
  }
}
 
export default MapFilterForm;