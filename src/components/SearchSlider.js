import React, { useState } from "react";
import { Slider } from "react-semantic-ui-range";
import "semantic-ui-css/semantic.min.css";
import { Label, Grid, Input } from "semantic-ui-react";



class SearchSlider extends React.Component{

    constructor(){
        super();
        this.state = {
            distance: 100 
        }
            
    }

    componentDidMount(){
        this.setState({
            distance: this.props.distance 
        })
    }
//   const [value, setValue] = useState(5);
 
//   const settings = {
//     start: 100,
//     min: 0,
//     max: 200,
//     step: 10,
//     onChange: value => {
//       setValue(value);
//     }
//   };
 
//   const handleValueChange = e => {
//     let value = parseInt(e.target.value);
//     if (!value) {
//       value = 0;
//     }
//     setValue(e.target.value);
//     this.props.handleChange(e);
//   };
 
  render () {

    // let settings = {
    //     start: {this.props.distance},
    //     min: 0, 
    //     max: 200,
    //     step: 10,
    //     onChange: event => {this.props.handleChange(event)} 
    //     }
    
      
  return (
    <div> 


        <Grid>
      <Grid.Column width={16}>
        <Slider labeled color="blue" name="maxdistance" valueLabelDisplay="auto" 
          
            start={this.state.distance}
       
            min={0}
            max={200}
            step={10}
            onChange={val => this.props.handleChange(val)} 
            />
      </Grid.Column>
    </Grid>

    </div>
  );

}
};
 
export default SearchSlider;