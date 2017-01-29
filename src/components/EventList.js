// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import EventRow from 'components/EventRow';
import SectionRow from 'components/SectionRow';
import ListSeparator from 'components/ListSeparator';
import Spacer from 'components/Spacer';
import { convertToFlatArray } from 'helpers/dataMassager';

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
    dataSource: dataSource.cloneWithRows(convertToFlatArray(this.props.events)),
  };

  renderRow(rowData: EventType) {
    if (rowData.section) return <SectionRow title={rowData.title} />;

    return (
      <EventRow
        event={rowData}
        onPress={() => this.context.navigation.pushRoute({ key: 'EVENT', event: rowData })}
      />
    );
  }

  renderSeparator(sectionId: string, rowId: string) {
    const index = Number(rowId);
    const data = this.state.dataSource._dataBlob.s1;

    if (
      data[index].section ||
      !data[index + 1] ||
      data[index + 1].section
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
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        onScroll={this.props.handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        renderHeader={() => <Spacer />}
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
  events: { [key: string]: Array<EventType> },
  handleScroll?: Function,
};

type Context = {
  navigation: {
    pushRoute: (route: RouteType) => void,
  },
};

export default EventList;
