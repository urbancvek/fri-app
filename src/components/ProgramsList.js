// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import { StyleSheet } from 'standard';
import ListSeparator from 'components/ListSeparator';
import ProgramRow from 'components/ProgramRow';
import SectionRow from 'components/SectionRow';
import { convertToFlatArray } from 'helpers/dataMassager';

const programs: { [key: string]: Array<ProgramType> } = {
  'Dodiplomski študij': [
    {
      title: 'Računalništvo in Informatika',
      subtitle: 'Univerzitetni program',
    },
    {
      title: 'Računalništvo in Informatika',
      subtitle: 'Visokošolški program',
    },
    {
      title: 'Računalništvo in Informatika',
      subtitle: 'Univerzitetni program',
    },
    {
      title: 'Računalništvo in Informatika',
      subtitle: 'Univerzitetni program',
    },
  ],
  'Magistrski študij': [
    {
      title: 'Računalništvo in Informatika',
      subtitle: 'Univerzitetni program',
    },
    {
      title: 'Računalništvo in Informatika',
      subtitle: 'Visokošolški program',
    },
    {
      title: 'Računalništvo in Informatika',
      subtitle: 'Univerzitetni program',
    },
    {
      title: 'Računalništvo in Informatika',
      subtitle: 'Univerzitetni program',
    },
  ],
};

const dataSource = new ListView.DataSource({
  rowHasChanged: (a, b) => a !== b,
});

@autobind
class ProgramsList extends Component {
  props: Props;
  state: State;
  context: Context;

  scrollView: ScrollViewType;

  state: State = {
    dataSource: dataSource.cloneWithRows(convertToFlatArray(programs)),
  };

  renderRow(rowData: ProgramType) {
    if (rowData.section) return <SectionRow title={rowData.title} />;

    return (
      <ProgramRow
        program={rowData}
        onPress={() => this.context.navigation.pushRoute({ key: 'PROGRAM', program: rowData })}
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
        showsVerticalScrollIndicator
      />
    );
  }
}

ProgramsList.contextTypes = {
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

export default ProgramsList;
