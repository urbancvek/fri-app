// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import { StyleSheet } from 'standard';
import ListSeparator from 'components/ListSeparator';
import CompanyRow from 'components/CompanyRow';

const companies: Array<CompanyType> = [
  { type: 'COMPANY', title: 'Shopster', color: '#DA2025', imageUrl: '' },
  { type: 'COMPANY', title: 'Outfit 7', color: '#58ebbd', imageUrl: '' },
  { type: 'COMPANY', title: 'Celtra', color: '#58e2eb', imageUrl: '' },
  { type: 'COMPANY', title: 'Nil', color: '#55b4ed', imageUrl: '' },
  { type: 'COMPANY', title: 'Microsoft', color: '#5880eb', imageUrl: '' },

];

const dataSource = new ListView.DataSource({
  rowHasChanged: (a, b) => a !== b,
});

@autobind
class CompaniesList extends Component {
  props: Props;
  state: State;

  scrollView: ScrollViewType;

  state: State = {
    dataSource: dataSource.cloneWithRows(companies),
  }

  renderRow(rowData: CompanyType) {
    return <CompanyRow company={rowData} />;
  }

  renderSeparator(sectionId: string, rowId: string) {
    return <ListSeparator key={sectionId + rowId} />;
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

CompaniesList.contextTypes = {
  navigation: PropTypes.object,
};

type State = {
  dataSource: Object,
};

type Props = {
  handleScroll?: Function,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
  },
});

export default CompaniesList;
