// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import ListSeparator from 'components/ListSeparator';
import Spacer from 'components/Spacer';
import LabRow from 'components/LabRow';

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
    dataSource: dataSource.cloneWithRows(this.props.labs),
  };

  renderRow(rowData: LabType) {
    return (
      <LabRow
        lab={rowData}
        onPress={() => this.context.navigation.pushRoute({ key: 'LAB', lab: rowData })}
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
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        onScroll={this.props.handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator
        renderHeader={() => <Spacer />}
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
  labs: Array<LabType>,
  handleScroll?: Function,
};

type Context = {
  navigation: {
    pushRoute: (route) => void,
  },
};

export default LabsList;
