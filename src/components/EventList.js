// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { ListView, Text, View, Dimensions } from 'react-native';

import { StyleSheet } from 'standard';
import EventRow from 'components/EventRow';

const { width } = Dimensions.get('window');

const urnik = [
  { type: 'SECTION', title: '10:00' },
  { type: 'EVENT', title: 'Sprejem dijakov', room: 'PA', color: '#eb5858' },
  { type: 'SECTION', title: '12:00' },
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

  scrollView: ScrollViewType;

  state: State = {
    dataSource: dataSource.cloneWithRows(urnik),
  };

  renderSectionHeader(_: any, sectionId: string) {
    return (
      <View style={styles.sectionView}>
        <Text style={styles.sectionText}>
          {sectionId}
        </Text>
      </View>
    );
  }

  renderRow(rowData: EventType | { type: 'SECTION', title: string }) {
    if (rowData.type === 'SECTION') return this.renderSectionHeader(null, rowData.title);
    return <EventRow event={rowData} />;
  }

  renderSeparator(sectionId: string, rowId: string) {
    const index = Number(rowId);

    if (
      urnik[index].type === 'SECTION' ||
      !urnik[index + 1] ||
      urnik[index + 1].type === 'SECTION'
    ) return null;

    return <View key={sectionId + rowId} style={styles.separator} />;
  }

  scrollTo(options: { x?: number, y?: number, animated?: boolean }) {
    this.scrollView.scrollTo(options);
  }

  render() {
    return (
      <ListView
        ref={(scrollView: ScrollViewType) => this.scrollView = scrollView}
        contentContainerStyle={{ marginTop: 200 }}
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

type State = {
  dataSource: Object,
};

type Props = {
  handleScroll: Function,
};

const styles = StyleSheet.create({
  sectionView: {
    height: 31,
    backgroundColor: '#f0f1f3',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  sectionText: {
    color: '#9a9a9a',
    fontSize: 13,
  },
  separator: {
    height: 0.5,
    alignSelf: 'center',
    width: width - 46,
    backgroundColor: '#e8e8e8',
  },
});

export default EventList;
