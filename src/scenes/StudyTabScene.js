// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import ParallaxScrollView from 'components/ParallaxScrollView';
import StudyProgramsList from 'components/StudyProgramsList';
import studyPrograms from 'data/studyPrograms.json';

@autobind
class StudyTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Študij"
        tabs={['PROGRAMI', 'VPIS']}
      >
        <StudyProgramsList studyPrograms={studyPrograms} />
        <ScrollView />
      </ParallaxScrollView>
    );
  }
}

export default StudyTabScene;
