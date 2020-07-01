import React, { useState } from "react";
import { Form, Checkbox, Button} from 'semantic-ui-react'


import 'semantic-ui-css/semantic.min.css';
 
class MapFilterForm extends React.Component {

  constructor(){
    super()
  }

  componentDidMount(){

  }

 



  render() {



    return (
        <>
        
  
        <Form>
        <Form.Field>
          Bikes:
        </Form.Field>
        <Form.Field>
          <Checkbox
            toggle 
            label='Cap BikeShare'
            name='checkboxRadioGroup'
            value='cap'
            defaultChecked = {this.props.displayCB}
            // checked={this.state.value === 'this'}
            onChange={(event) => this.props.changeFilter("cap")}
         
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            toggle 
            label='Helbiz'
            name='checkboxRadioGroup'
            value='helbiz'
            defaultChecked = {this.props.displayHB}
            // checked={this.state.value === 'that'}
            onChange={(event) => this.props.changeFilter("helbiz")}
       
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            toggle 
            label='JUMP'
            name='checkboxRadioGroup'
            value='jump'
            defaultChecked = {this.props.displayJB} 
            // checked={this.state.value === 'that'}
            onChange={(event) => this.props.changeFilter("jump")}
        
          />
        </Form.Field>


        <Form.Field>
          Scooters:
        </Form.Field>

        <Form.Field>
          <Checkbox
            toggle 
            label='SKIP'
            name='checkboxRadioGroup'
            value='skip'
            defaultChecked = {this.props.displaySKIP} 
            // checked={this.state.value === 'that'}
            onChange={(event) => this.props.changeFilter("skip")}
        
          />
        </Form.Field>
       

        <Form.Field>
          <Checkbox
            toggle 
            label='SPIN'
            name='checkboxRadioGroup'
            value='spin'
            defaultChecked = {this.props.displaySPIN} 
            // checked={this.state.value === 'that'}
            onChange={(event) => this.props.changeFilter("spin")}
        
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            toggle 
            label='RAZOR'
            name='checkboxRadioGroup'
            value='razor'
            defaultChecked = {this.props.displayRAZOR} 
            onChange={(event) => this.props.changeFilter("razor")}
        
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            toggle 
            label='LYFT'
            name='checkboxRadioGroup'
            value='lyft'
            defaultChecked = {this.props.displayLYFT} 
            onChange={(event) => this.props.changeFilter("lyft")}
        
          />
        </Form.Field>





      </Form>
   
      <br />
      <br />
      <Button primary onClick={(event) => this.props.handleRefreshBikes(event) } >Refresh</Button>



</>

    )
   
  }
}
 
export default MapFilterForm;