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
            <Grid >
                <Grid.Row>

                <Grid.Column width={2}>
                Distance
                </Grid.Column>
                <Grid.Column width={6}>
                {this.props.journal.distance} miles
                </Grid.Column>

                <Grid.Column width={2}>
                Duration
                </Grid.Column>
                <Grid.Column width={6}>
                {this.props.journal.duration}
                </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={2}>
                Difficulty
                </Grid.Column>
                <Grid.Column width={6}>
                {this.props.journal.difficulty} 
                </Grid.Column>
                

                <Grid.Column width={2}>
                Calories
                </Grid.Column>
                <Grid.Column width={6}>
                {this.props.journal.calories}
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                    Notes 
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