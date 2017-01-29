// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import { StyleSheet } from 'standard';
import ListSeparator from 'components/ListSeparator';
import LabRow from 'components/LabRow';

const labs: Array<LabType> = [
  {
    title: 'UMETNO INTELIGENCO',
    location: 'R1.23',
    image: {
      url: 'http://www-ti.fri.uni-lj.si/sites/default/files/Lab%20za%20adaptivne%20sisteme%20in%20parelelno%20procesiranje_p2.jpg',
    },
  },
  {
    title: 'UMETNE VIZUALNE SPOZNAVNE SISTEME',
    location: 'R1.23',
    image: {
      url: 'http://www-ti.fri.uni-lj.si/sites/default/files/Lab%20za%20algoritme%20in%20podatkovne%20strukture.jpg',
    },
  },
  {
    title: 'ADAPTIVNE SISTEME IN PARALELNO PROCESIRANJE',
    location: 'R1.23',
    image: {
      url: 'http://www-ti.fri.uni-lj.si/sites/default/files/Laboratorij%20za%20bioinformatiko.jpg',
    },
  },
  {
    title: 'PODATKOVNE TEHNOLOGIJE',
    location: 'R1.23',
    image: {
      url: 'http://www-ti.fri.uni-lj.si/sites/default/files/Lab%20za%20e-medije.jpg',
    },
  },
];

const dataSource = new ListView.DataSource({
  rowHasChanged: (a, b) => a !== b,
});

@autobind
class LabsList extends Component {
  props: Props;
  state: State;
  context: Context;

  scrollView: ScrollViewType;

  state: State = {
    dataSource: dataSource.cloneWithRows(labs),
  };

  renderRow(rowData: LabType) {
    return (
      <LabRow
        lab={rowData}
        onPress={() => this.context.navigation.pushRoute({ key: 'LAB', event: rowData })}
      />
    );
  }

  renderSeparator(sectionId: string, rowId: string) {
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
        showsVerticalScrollIndicator
      />
    );
  }
}

LabsList.contextTypes = {
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

export default LabsList;
