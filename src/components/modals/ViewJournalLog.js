import React from 'react'
import { Button, Header, Icon, Modal, Grid } from 'semantic-ui-react'


class ViewJournalLog extends React.Component {

    constructor(){
        super();
        this.state = {
            open: false 
        }
    }

    handleCancel = () => {
        //simply closes for edit reservation confirmation form
        console.log("closing delete modal")
        this.setState({ 
            open: false 
        })
      }

    handleOpenModal= () => {
      this.setState({ 
         open: true
       })
    }

    handleDeleteLog = (journalEntry) => {
        console.log("delte clicked", journalEntry)

        this.props.deleteJournalEntry(journalEntry)

        this.setState({ 
            open: false 
        })

    }



    render() {

        return (
            <>
        

        <Modal  
            trigger={<Icon name="zoom in" onClick={this.handleOpenModal} id={this.props.journal.id} />}
            onClose={this.handleCancel}
            open={this.state.open}
            
            size='small' >
        <Header icon='archive' content={'Review Journal Entry: ' + this.props.journal.date} />
        <Modal.Content>
            <p>
            <Grid celled >
                <Grid.Row>

                <Grid.Column width={2} style={{background: "#3FDBCA"}} >
                    <b>
                Distance</b>
                </Grid.Column>
                <Grid.Column width={6}>
                {this.props.journal.distance} miles
                </Grid.Column>

                <Grid.Column width={2} style={{background: "#3FDBCA"}}>
                <b>Duration</b>
                </Grid.Column>
                <Grid.Column width={6}>
                {this.props.journal.duration}
                </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={2} style={{background: "#3FDBCA"}}>
                <b>Difficulty</b>
                </Grid.Column>
                <Grid.Column width={6}>
                {this.props.journal.difficulty} 
                </Grid.Column>
                

                <Grid.Column width={2} style={{background: "#3FDBCA"}}>
                <b>Calories</b>
                </Grid.Column>
                <Grid.Column width={6}>
                {this.props.journal.calories}
                </Grid.Column>
                </Grid.Row>


                {this.props.journal.replacedcommute === false ? null :
                
                <Grid.Row>
                <Grid.Column width={2} style={{background: "#3FDBCA"}}>
                <b> Mode of Transport</b>
                </Grid.Column>
                <Grid.Column width={6}>
                {this.props.journal.transportmode} 
                </Grid.Column>
                
                <Grid.Column width={2} style={{background: "#3FDBCA"}}>
                <b>Dollars Saved</b>
                </Grid.Column>
                <Grid.Column width={6}>
                {this.props.journal.dollarssaved}
                </Grid.Column>
                </Grid.Row>
                    
                }



                <Grid.Row>
                    <Grid.Column width={2} style={{background: "#3FDBCA"}}>
                   <b> Notes </b>
                    </Grid.Column>
                    <Grid.Column width={14}>
                    {this.props.journal.notes}
                    </Grid.Column>
                    
                </Grid.Row>

            </Grid>


            </p>
        </Modal.Content>
        <Modal.Actions>

            <Button basic 
            color='red' 
            onClick={this.handleCancel}
            // icon='remove'
            content='Close'
            >
            </Button>

        </Modal.Actions>
        </Modal>
        </>
        )
}
}


export default ViewJournalLog