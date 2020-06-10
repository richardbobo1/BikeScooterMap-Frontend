import React from 'react';
import { Form, Checkbox, Button} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
 
class ExploreFilterForm extends React.Component {

  constructor(){
    super();
    this.state = {
      difficulty: 'Easy',
      surface: 'Paved'
    }
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSearchClick = (e) => {
    let diff = this.state.difficulty
    let surface = this.state.surface 
    this.props.handleRouteSearchFilter(diff, surface)
    console.log("Searching!", diff )
  }

  onClearSearch = (e) => {
    console.log("clearing search")
    this.props.handleResetFilters(e) 
    this.setState({
      difficulty: 'Easy',
      surface: 'Paved'
    })
  }

  render() {
    return (
        <>
        
  
        <Form>
        <Form.Field>
          Search Filters: 
        </Form.Field>
        <Form.Field>
        <select fluid id="difficulty" name="difficulty" placeholder="Easy" value={this.state.difficulty} onChange={this.handleChange}>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
        </select>
        </Form.Field>
        <Form.Field>
        <select fluid label="Surface Type" name="surface" placeholder="Surface Type" id="surface" value={this.state.surface} onChange={this.handleChange}>
          <option value="Paved">Paved</option>
          <option value="Gravel">Gravel</option>
          <option value="Mixed">Mixed</option>
        </select>
        </Form.Field>
        <Button onClick={(event) => this.onSearchClick(event) } >Search</Button>
        <Button onClick={(event) => this.onClearSearch(event) }>Reset</Button>


      </Form>



</>

    )
   
  }
}
 
export default ExploreFilterForm;