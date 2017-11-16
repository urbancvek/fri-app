// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { capitalize } from 'lodash';

import ListSeparator from 'components/ListSeparator';
import StudyProgramRow from 'components/StudyProgramRow';
import SectionRow from 'components/SectionRow';

type Props = {
  handleScroll?: Function,
};

@autobind
class StudyProgramsList extends Component<Props> {
  scrollView: ScrollViewType;

  renderItem(item: StudyProgramType) {
    const { item: studyProgram } = item;
    if (studyProgram.section) return <SectionRow title={studyProgram.title} />;

    return (
      <StudyProgramRow
        studyProgram={studyProgram}
        onPress={() => {}}
      />
    );
  }

  scrollTo(options: { x?: number, y?: number, animated?: boolean }) {
    this.scrollView.scrollToOffset({ offset: options.y });
  }

  render() {
    return (
      <FlatList
        ref={(scrollView: ScrollViewType) => this.scrollView = scrollView}
        data={this.props.studyPrograms}
        renderItem={this.renderItem}
        ItemSeparatorComponent={ListSeparator}
        onScroll={this.props.handleScroll}
        keyExtractor={item => item.title + item.subtitle}
        contentContainerStyle={{ paddingTop: 200 }}
        scrollIndicatorInsets={{ top: 200 }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator
      />
    );
  }
}

export default StudyProgramsList;
