import React from 'react'
import { Table, Button, Icon  } from 'semantic-ui-react'
import DeleteJournalLog from './modals/DeleteJournalLog'

const RideLogTable = (props) => (

  props.journalEntries.length === 0 ? "Log your first ride!" : 
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

      { props.journalEntries.map( journal => 
            <Table.Row>
            <Table.Cell>{journal.date}</Table.Cell>
            <Table.Cell>{journal.distance} miles</Table.Cell>
            <Table.Cell>{journal.duration} mins</Table.Cell>
            <Table.Cell>{journal.calories} calories</Table.Cell>
            <Table.Cell><Icon name="zoom in" /><Icon name="compose" /> <DeleteJournalLog journal={journal} deleteJournalEntry={props.deleteJournalEntry}  /> </Table.Cell>
          </Table.Row>

      ) 
      //using an array of journal entries, map through and create a row for each entry 

      }
      
    </Table.Body>
  </Table>
  
)

export default RideLogTable