// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import { StyleSheet } from 'standard';
import EventRow from 'components/EventRow';
import SectionRow from 'components/SectionRow';
import ListSeparator from 'components/ListSeparator';
import { convertToFlatArray } from 'helpers/dataMassager';

const urnik: { [key: string]: Array<EventType> } = {
  '10:00': [
    {
      title: 'Sprejem dijakov',
      location: 'PA',
      accentColor: '#eb5858',
      description: [
        'nagovor ravnatelja',
        'predstavitev študijskih programov',
      ],
    },
  ],
  '12:00': [
    {
      title: 'Robotika',
      location: 'P12',
      accentColor: '#eb8b58',
    },
    {
      title: 'Predstavitev dronov',
      location: 'P22',
      accentColor: '#ebd158',
    },
    {
      title: 'Uporaba računalništva',
      location: 'P22',
      accentColor: '#abeb58',
    },
    {
      title: 'Karierni kotiček',
      location: 'Glavni prostor',
      accentColor: '#4ed758',
    },
    {
      title: 'Predstavitev Garaže',
      location: 'Garaža',
      accentColor: '#4A84A3',
    },
  ],
  '14:00': [
    {
      title: 'Sprejem dijakov',
      location: 'PA',
      accentColor: '#eb5858',
    },
  ],
  '16:00': [
    {
      title: 'Robotika',
      location: 'P12',
      accentColor: '#eb8b58',
    },
    {
      title: 'Predstavitev dronov',
      location: 'P22',
      accentColor: '#ebd158',
    },
    {
      title: 'Uporaba računalništva',
      location: 'P22',
      accentColor: '#abeb58',
    },
    {
      title: 'Karierni kotiček',
      location: 'Glavni prostor',
      accentColor: '#4ed758',
    },
    {
      title: 'Predstavitev Garaže',
      location: 'Garaža',
      accentColor: '#4A84A3',
    },
  ],
};

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
    dataSource: dataSource.cloneWithRows(convertToFlatArray(urnik)),
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
