import React from 'react';
import { Form, Checkbox, Button,Divider } from 'semantic-ui-react'
import SearchSlider from './SearchSlider'

import 'semantic-ui-css/semantic.min.css';
 
class ExploreFilterForm extends React.Component {

  constructor(){
    super();
    this.state = {
      difficulty: 'All',
      surface: 'All',
      maxdistance: 100,
      min: 0,
      max: 200
    }
  }


  handleChange = (e) => {
    console.log("changing....", e.target.value )

    this.setState({ [e.target.name]: e.target.value });
  };

  onSearchClick = (e) => {
    let diff = this.state.difficulty
    let surface = this.state.surface 
    let min = this.state.min 
    let max = this.state.max 
    this.props.handleRouteSearchFilter(diff, surface, min, max)
    console.log("Searching!", diff )
  }

  onClearSearch = (e) => {
    console.log("clearing search")
    this.props.handleResetFilters(e) 
    this.setState({
      difficulty: 'All',
      surface: 'All',
      min: 0,
      max: 200
    })
  }



  render() {
    


    return (
        <>
        
  
        <Form>
        <Form.Field>
          Difficulty
        </Form.Field>
        <Form.Field>
        <select fluid id="difficulty" name="difficulty" placeholder="Easy" value={this.state.difficulty} onChange={this.handleChange}>
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
        </select>
        </Form.Field>
        <Divider/>
        Surface Type<br /><br />
        <Form.Field>
        <select fluid label="Surface Type" name="surface" placeholder="All" id="surface" value={this.state.surface} onChange={this.handleChange}>
        <option value="All">All</option>
          <option value="Paved">Paved</option>
          <option value="Gravel">Gravel</option>
          <option value="Mixed">Mixed</option>
        </select>
        </Form.Field>
        <Divider/>
        Distance:   
        <br />
        <br />
       
        <Form.Input name="min" placeholder="Min" onChange={this.handleChange} />
        <Form.Input name="max" placeholder="Max" onChange={this.handleChange} />
       

        {/* <SearchSlider distance={this.state.maxdistance} handleChange={this.handleChange} /> */}
        <Divider/>
        <Button onClick={(event) => this.onSearchClick(event) } >Search</Button>
        <Button onClick={(event) => this.onClearSearch(event) }>Reset</Button>


      </Form>



</>

    )
   
  }
}
 
export default ExploreFilterForm;