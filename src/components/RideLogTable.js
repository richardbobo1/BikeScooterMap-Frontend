import React from 'react'
import { Table, Button, Icon  } from 'semantic-ui-react'
import DeleteJournalLog from './modals/DeleteJournalLog'
import ViewJournalLog from './modals/ViewJournalLog'
import EditJournalLogForm from './modals/EditJournalLogForm'


class RideLogTable extends React.Component {

  formatDate = (date) =>{
    var date = new Date(date);
    return [
       ("0" + date.getDate()).slice(-2),
       ("0" + (date.getMonth()+1)).slice(-2),
       date.getFullYear()
    ].join('/');
  }

  
  render(){
    return(

  


  this.props.journalEntries.length === 0 ? "Log your first ride!" : 
  <Table compact>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Distance</Table.HeaderCell>
        <Table.HeaderCell>Time</Table.HeaderCell>
        <Table.HeaderCell>Calories</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>

      { 
      //using an array of journal entries, map through and create a row for each entry 
      this.props.journalEntries.map( journal => 
            <Table.Row>
            <Table.Cell>{journal.date}</Table.Cell>
            <Table.Cell>{journal.distance} miles</Table.Cell>
            <Table.Cell>{journal.duration} mins</Table.Cell>
            <Table.Cell>{journal.calories} calories</Table.Cell>
            <Table.Cell>
              <ViewJournalLog journal={journal} /><EditJournalLogForm journal={journal} /><DeleteJournalLog journal={journal} deleteJournalEntry={this.props.deleteJournalEntry}  /> 
            </Table.Cell>
          </Table.Row>

      ) 

      }
      
    </Table.Body>
  </Table>
  
  )}
  }


export default RideLogTable