// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { ListView, Text } from 'react-native';

import EventRow from 'components/EventRow';

const urnik = {
  '10:00': [
    { title: 'Mata', room: 'P1', duration: '1 ura 30 min' },
    { title: 'Slova', room: 'P20', duration: '2 uri' },
  ],
  '12:00': [
    { title: 'Zgodla', room: 'P12', duration: '1 ura' },
    { title: 'Športna', room: 'P01', duration: '2 uri 30 min' },
  ],
};

const dataSource = new ListView.DataSource({
  rowHasChanged: (a, b) => a !== b,
  sectionHeaderHasChanged: (a, b) => a !== b,
});

@autobind
class TimeTableList extends Component {
  state: State;

  state: State = {
    dataSource: dataSource.cloneWithRowsAndSections(urnik),
  };

  renderSectionHeader(_: any, sectionId: string) {
    return <Text>{sectionId}</Text>;
  }

  renderRow(event: EventType) {
    return <EventRow event={event} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
      />
    );
  }
}

type State = {
  dataSource: Object,
};

export default TimeTableList;
