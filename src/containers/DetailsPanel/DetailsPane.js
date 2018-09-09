import React from 'react';
import { Header, Icon, Label, Table, List, ListItem, Message, Segment } from "semantic-ui-react";
import { Bar } from "@nivo/bar";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

class DetailsPane extends React.Component {
  renderStats() {
    const stats = [
      { icon: 'ambulance', name: 'Health Services'},
      { icon: 'user secret', name: 'Crime Rate'},
      { icon: 'book', name: 'Education' },
    ];

    return stats.map(s => {
      const rank = getRandomInt(1, 35);
      let colour;

      if (rank <= 10) colour = 'green';
      else if (rank <= 15) colour = undefined;
      else if (rank <= 25) colour = 'orange';
      else if (rank <= 35) colour = 'red';

      return (
        <Table.Row>
          <Table.Cell>
            <Icon name={s.icon}/>
          </Table.Cell>

          <Table.Cell>
            <strong>{s.name}</strong>
          </Table.Cell>
          <Table.Cell>
            {ordinal_suffix_of(rank)} state-wide
          </Table.Cell>

          <Table.Cell>
            <Icon name={'arrow alternate circle ' + rank % 2 ? 'up' : 'down' }/>
          </Table.Cell>
        </Table.Row>
      );
    });
  }
  render() {

    const population = parseInt(this.props.lga.POPULATION, 10);
    return (
      <div>

        <Message
          info
          icon='map marker alternate'
          header={this.props.lga.ORGNAME}
          content={!Number.isNaN(population)
            ? population.toLocaleString() + ' residents'
            : undefined}
          attached="top"
        />
        <Table attached>
          <Table.Body>
            {this.renderStats()}
          </Table.Body>
        </Table>

        <Segment>
          <Header>Available Services</Header>
          <List>
            {
              Object.keys(this.props.selectedLgaStats).map(type =>
                <ListItem image>
                  <img src={`/${type}.png`} style={{verticalAlign: 'middle'}} />
                  {' '}
                  {this.props.selectedLgaStats[type]} {type.replace('childcare', 'childcare centre')}s
                </ListItem>
              )
            }
          </List>
        </Segment>
      </div>
    );
  }
}

export default DetailsPane;