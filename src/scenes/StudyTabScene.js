// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';

import ParallaxScrollView from 'components/ParallaxScrollView';
import StudyProgramsList from 'components/StudyProgramsList';
import EnrollView from 'components/EnrollView';
import studyPrograms from 'data/studyPrograms.json';
import enrollContent from 'data/enroll';

@autobind
class StudyTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Študij"
        tabs={['PROGRAMI', 'VPIS']}
        backgroundImage={require('assets/header_images/fri_background.png')}
      >
        <StudyProgramsList studyPrograms={studyPrograms} />
        <EnrollView content={enrollContent} />
      </ParallaxScrollView>
    );
  }
}

export default StudyTabScene;
