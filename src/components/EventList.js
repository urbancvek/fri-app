// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import { StyleSheet } from 'standard';
import EventRow from 'components/EventRow';
import SectionRow from 'components/SectionRow';
import ListSeparator from 'components/ListSeparator';

const urnik: Array<EventType | { type: 'SECTION', title: string }> = [
  { type: 'SECTION', title: '10:00' },
  { type: 'EVENT', title: 'Sprejem dijakov', room: 'PA', color: '#eb5858' },
  { type: 'SECTION', title: '12:00', description: 'voden ogled po skupinah' },
  { type: 'EVENT', title: 'Robotika', room: 'P12', color: '#eb8b58' },
  { type: 'EVENT', title: 'Predstavitev dronov', room: 'P22', color: '#ebd158' },
  { type: 'EVENT', title: 'Uporaba računalništva', room: 'P22', color: '#abeb58' },
  { type: 'EVENT', title: 'Karierni kotiček', room: 'Glavni prostor', color: '#4ed758' },
  { type: 'EVENT', title: 'Predstavitev Garaže', room: 'Garaža', color: '#4A84A3' },
  { type: 'SECTION', title: '14:00' },
  { type: 'EVENT', title: 'Sprejem dijakov', room: 'PA', color: '#eb5858' },
  { type: 'SECTION', title: '16:00' },
  { type: 'EVENT', title: 'Robotika', room: 'P12', color: '#eb8b58' },
  { type: 'EVENT', title: 'Predstavitev dronov', room: 'P22', color: '#ebd158' },
  { type: 'EVENT', title: 'Uporaba računalništva', room: 'P22', color: '#abeb58' },
  { type: 'EVENT', title: 'Karierni kotiček', room: 'Glavni prostor', color: '#4ed758' },
  { type: 'EVENT', title: 'Predstavitev Garaže', room: 'Garaža', color: '#4A84A3' },
];

const dataSource = new ListView.DataSource({
  rowHasChanged: (a, b) => a !== b,
});

@autobind
class EventList extends Component {
  props: Props;
  state: State;
  context: Context;

  scrollView: ScrollViewType;

  state: State = {
    dataSource: dataSource.cloneWithRows(urnik),
  };

  renderRow(rowData: EventType | { type: 'SECTION', title: string }) {
    switch (rowData.type) {
      case 'SECTION': return (
        <SectionRow
          section={rowData}
        />
      );

      case 'EVENT': return (
        <EventRow
          event={rowData}
          onPress={() => this.context.navigation.pushRoute({ key: 'EVENT', event: rowData })}
        />
      );

      default: return null;
    }
  }

  renderSeparator(sectionId: string, rowId: string) {
    const index = Number(rowId);

    if (
      urnik[index].type === 'SECTION' ||
      !urnik[index + 1] ||
      urnik[index + 1].type === 'SECTION'
    ) return null;

    return <ListSeparator key={sectionId + rowId} />;
  }

  scrollTo(options: { x?: number, y?: number, animated?: boolean }) {
    this.scrollView.scrollTo(options);
  }

  render() {
    return (
      <ListView
        ref={(scrollView: ScrollViewType) => this.scrollView = scrollView}
        contentContainerStyle={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        onScroll={this.props.handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

EventList.contextTypes = {
  navigation: PropTypes.object,
};

type State = {
  dataSource: Object,
};

type Props = {
  handleScroll?: Function,
};

type Context = {
  navigation: {
    pushRoute: (route) => void,
  },
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
  },
});

export default EventList;
