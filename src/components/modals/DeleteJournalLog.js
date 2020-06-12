import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'


class DeleteJournalLog extends React.Component {

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
            trigger={<Icon name="trash alternate outline" onClick={this.handleOpenModal} id={this.props.journal.id} />}
            onClose={this.handleCancel}
            open={this.state.open}
            basic 
            size='small' >
        <Header icon='archive' content='Delete Journal Entry' />
        <Modal.Content>
            <p>
            Are you sure you want to delete this entry from your journal? 
            </p>
        </Modal.Content>
        <Modal.Actions>

            <Button basic 
            color='red' inverted
            onClick={this.handleCancel}
            icon='remove'
            content='No, cancel'
            >
            </Button>

            <Button color='green' inverted positive
            onClick={() => this.handleDeleteLog(this.props.journal)}
            labelPosition='right'
            icon='checkmark'
            content='Yes, Delete'
            >
            </Button>
        </Modal.Actions>
        </Modal>
        </>
        )
}
}


export default DeleteJournalLog