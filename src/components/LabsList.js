// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import { StyleSheet } from 'standard';
import ListSeparator from 'components/ListSeparator';
import LabRow from 'components/LabRow';

const labs: Array<LabType> = [
  { type: 'LAB', title: 'LABORATORIJ ZA UMETNO INTELIGENCO' },
  { type: 'LAB', title: 'LABORATORIJ ZA UMETNE VIZUALNE SPOZNAVNE SISTEME' },
  { type: 'LAB', title: 'LABORATORIJ ZA ADAPTIVNE SISTEME IN PARALELNO PROCESIRANJE' },
  { type: 'LAB', title: 'LABORATORIJ ZA PODATKOVNE TEHNOLOGIJE' },
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
    return <LabRow lab={rowData} />;
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
