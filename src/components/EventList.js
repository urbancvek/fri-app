// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { FlatList } from 'react-native';

import EventRow from 'components/EventRow';
import SectionRow from 'components/SectionRow';
import ListSeparator from 'components/ListSeparator';

type Props = {
  events: Array<EventType>,
  handleScroll?: Function,
};

@autobind
class EventList extends Component<Props, State> {
  scrollView: ScrollViewType;

  renderRow(item: EventType) {
    const { item: event } = item;

    if (event.section) return <SectionRow title={event.startTime} />;

    return (
      <EventRow
        event={event}
        onPress={() => {}}
      />
    );
  }

  scrollTo(options: { x?: number, y?: number, animated?: boolean }) {
    this.scrollView.scrollToOffset({ offset: options.y });
  }

  render() {
    return (
      <FlatList
        ref={(scrollView: ScrollViewType) => this.scrollView = scrollView}
        data={this.props.events}
        renderItem={this.renderRow}
        keyExtractor={item => item.title || item.startTime}
        ItemSeparatorComponent={ListSeparator}
        contentContainerStyle={{ paddingTop: 200 }}
        scrollIndicatorInsets={{ top: 200 }}
        onScroll={this.props.handleScroll}
        scrollEventThrottle={16}
      />
    );
  }
}

export default EventList;
