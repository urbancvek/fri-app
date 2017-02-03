// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import ListSeparator from 'components/ListSeparator';
import CompanyRow from 'components/CompanyRow';
import Spacer from 'components/Spacer';

const dataSource = new ListView.DataSource({
  rowHasChanged: (a, b) => a !== b,
});

@autobind
class CompaniesList extends Component {
  props: Props;
  state: State;
  context: Context;

  scrollView: ScrollViewType;

  state: State = {
    dataSource: dataSource.cloneWithRows(this.props.companies),
  }

  renderRow(rowData: CompanyType) {
    return (
      <CompanyRow
        company={rowData}
        onPress={() => this.context.navigation.pushRoute({ key: 'COMPANY', company: rowData })}
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
        showsVerticalScrollIndicator={false}
        renderHeader={() => <Spacer />}
        enableEmptySections
      />
    );
  }
}

CompaniesList.contextTypes = {
  navigation: PropTypes.object,
};

type State = {
  dataSource: Object,
};

type Props = {
  companies: Array<CompanyType>,
  handleScroll?: Function,
};

type Context = {
  navigation: {
    pushRoute: (route: RouteType) => void,
  },
};

export default CompaniesList;
