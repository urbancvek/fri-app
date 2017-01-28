// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import { StyleSheet } from 'standard';
import ListSeparator from 'components/ListSeparator';
import CompanyRow from 'components/CompanyRow';

const companies: Array<CompanyType> = [
  {
    title: 'Shopster',
    accentColor: '#dc1c1b',
    location: 'Garaža',
    image: {
      url: 'https://raw.githubusercontent.com/garazaFRI/friappdata/master/company_images/shopster@3x.png',
      width: 348,
      height: 81,
    },
  },
  {
    title: 'Outfit 7',
    accentColor: '#4feb36',
    location: 'ST1',
    image: {
      url: 'https://raw.githubusercontent.com/garazaFRI/friappdata/master/company_images/outfit_7@3x.png',
      width: 333,
      height: 108,
    },
  },
  {
    title: 'Celtra',
    accentColor: '#ff3366',
    location: 'ST2',
    image: {
      url: 'https://raw.githubusercontent.com/garazaFRI/friappdata/master/company_images/celtra@3x.png',
      width: 273,
      height: 120,
    },
  },
  {
    title: 'Nil',
    accentColor: '#55b4ed',
    location: 'ST3',
    image: {
      url: 'https://raw.githubusercontent.com/garazaFRI/friappdata/master/company_images/nil@3x.png',
      width: 264,
      height: 81,
    },
  },
  {
    title: 'Microsoft',
    accentColor: '#ffb900',
    location: 'ST4',
    image: {
      url: 'https://raw.githubusercontent.com/garazaFRI/friappdata/master/company_images/microsoft@3x.png',
      width: 330,
      height: 72,
    },
  },
];

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
    dataSource: dataSource.cloneWithRows(companies),
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

export default CompaniesList;
