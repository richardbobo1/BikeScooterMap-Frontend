import React, {Component} from 'react';
import { Marker, InfoWindow } from 'google-maps-react';



export default class MarkerWindowInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
    }


    handleToggleOpen = () => {
        this.setState({
          isOpen: true,
        });
      };
    
      handleToggleClose = () => {
        this.setState({
          isOpen: false,
        });
      };




    render(){

        console.log("loading marker")
    

        return (
          

            <Marker
                key={this.props.markerInfo.station_id}
                position={{lat: this.props.markerInfo.lat, lng: this.props.markerInfo.lon}}
                label={this.props.markerInfo.name}
                onClick={() => this.handleToggleOpen()}
            >

            {
                this.state.isOpen &&
             <InfoWindow onCloseClick={this.props.handleToggleClose}>
                 <span>Something</span>
             </InfoWindow>
            }


            </Marker>

        )
    }



}
