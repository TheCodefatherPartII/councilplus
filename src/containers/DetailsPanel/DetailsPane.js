import React from 'react';
import { Header, Icon, Label, List, ListItem, Message, Segment } from "semantic-ui-react";
import { Bar } from "@nivo/bar";

class DetailsPane extends React.Component {
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
        />

        <Segment>
          <Header>Indicators</Header>
          <List>
            {["wheelchair"].map(ind => (
              <ListItem key={ind}>
                <Label image>
                  <Icon circular name={ind} />
                  {ind} = {(Math.random() * 100).toFixed(0)}%
                </Label>
              </ListItem>
            ))}
          </List>
        </Segment>
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