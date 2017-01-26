// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { ListView, Text, Animated } from 'react-native';

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
  '14:00': [
    { title: 'Mata', room: 'P1', duration: '1 ura 30 min' },
    { title: 'Slova', room: 'P20', duration: '2 uri' },
  ],
  '16:00': [
    { title: 'Zgodla', room: 'P12', duration: '1 ura' },
    { title: 'Športna', room: 'P01', duration: '2 uri 30 min' },
  ],
  '18:00': [
    { title: 'Mata', room: 'P1', duration: '1 ura 30 min' },
    { title: 'Slova', room: 'P20', duration: '2 uri' },
  ],
  '20:00': [
    { title: 'Zgodla', room: 'P12', duration: '1 ura' },
    { title: 'Športna', room: 'P01', duration: '2 uri 30 min' },
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
    return <Text>{sectionId}</Text>;
  }

  renderRow(event: EventType) {
    return <EventRow event={event} />;
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

export default EventList;
