// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { ListView, Text, Animated, View, Dimensions } from 'react-native';

import { StyleSheet } from 'standard';
import EventRow from 'components/EventRow';

const { width } = Dimensions.get('window');

const urnik = {
  '10:00': [
    { title: 'Sprejem dijakov', room: 'PA', color: '#eb5858' },
  ],
  '12:00': [
    { title: 'Robotika', room: 'P12', color: '#eb8b58' },
    { title: 'Predstavitev dronov', room: 'P22', color: '#ebd158' },
    { title: 'Uporaba računalništva', room: 'P22', color: '#abeb58' },
    { title: 'Karierni kotiček', room: 'Glavni prostor', color: '#4ed758' },
    { title: 'Predstavitev Garaže', room: 'Garaža', color: '#4A84A3' },
  ],
  '14:00': [
    { title: 'Sprejem dijakov', room: 'PA', color: '#eb5858' },
  ],
  '16:00': [
    { title: 'Robotika', room: 'P12', color: '#eb8b58' },
    { title: 'Predstavitev dronov', room: 'P22', color: '#ebd158' },
    { title: 'Uporaba računalništva', room: 'P22', color: '#abeb58' },
    { title: 'Karierni kotiček', room: 'Glavni prostor', color: '#4ed758' },
    { title: 'Predstavitev Garaže', room: 'Garaža', color: '#4A84A3' },
  ],
};

const dataSource = new ListView.DataSource({
  rowHasChanged: (a, b) => a !== b,
  sectionHeaderHasChanged: (a, b) => a !== b,
});

@autobind
class EventList extends Component {
  props: Props;
  state: State;

  scrollView: ScrollViewType;

  state: State = {
    dataSource: dataSource.cloneWithRowsAndSections(urnik),
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

  renderRow(event: EventType) {
    return <EventRow event={event} />;
  }

  renderSeparator(sectionId: string, rowId: string) {
    return <View key={sectionId + rowId} style={styles.separator} />;
  }

  scrollTo(options: { x?: number, y?: number, animated?: boolean }) {
    this.scrollView.scrollTo(options);
  }

  render() {
    return (
      <Animated.View style={{ marginTop: this.props.headerHeight }}>
        <ListView
          ref={(scrollView: ScrollViewType) => this.scrollView = scrollView}
          dataSource={this.state.dataSource}
          renderSectionHeader={this.renderSectionHeader}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          onScroll={this.props.handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    );
  }
}

type State = {
  dataSource: Object,
};

type Props = {
  handleScroll: Function,
  headerHeight: Animated.Value,
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
