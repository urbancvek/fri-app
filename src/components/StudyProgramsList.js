// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import { StyleSheet } from 'standard';
import ListSeparator from 'components/ListSeparator';
import StudyProgramRow from 'components/StudyProgramRow';
import SectionRow from 'components/SectionRow';
import { convertToFlatArray } from 'helpers/dataMassager';

const dataSource = new ListView.DataSource({
  rowHasChanged: (a, b) => a !== b,
});

@autobind
class StudyProgramsList extends Component {
  props: Props;
  state: State;
  context: Context;

  scrollView: ScrollViewType;

  state: State = {
    dataSource: dataSource.cloneWithRows(convertToFlatArray(this.props.studyPrograms)),
  };

  renderRow(rowData: StudyProgramType) {
    if (rowData.section) return <SectionRow title={rowData.title} />;

    return (
      <StudyProgramRow
        studyProgram={rowData}
        onPress={() => this.context.navigation.pushRoute({ key: 'STUDY_PROGRAM', studyProgram: rowData })}
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

StudyProgramsList.contextTypes = {
  navigation: PropTypes.object,
};

type State = {
  dataSource: Object,
};

type Props = {
  studyPrograms: { [key: string]: Array<StudyProgramType> },
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

export default StudyProgramsList;