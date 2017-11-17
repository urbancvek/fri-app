// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import axios from 'axios';

import ParallaxScrollView from 'components/ParallaxScrollView';
import StudyProgramsList from 'components/StudyProgramsList';
import EnrollView from 'components/EnrollView';

type Props = {};

type State = {
  studyPrograms: Array<StudyProgramType>,
  enrollContent: string,
};

@autobind
class StudyTabScreen extends Component<Props, State> {
  state = {
    studyPrograms: [],
    enrollContent: '<div />',
  };

  static navigatorStyle = {
    navBarHidden: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const responseStudy = await axios.get('https://raw.githubusercontent.com/garazaFRI/friappdata/master/data/studyPrograms.json');
    this.setState({ studyPrograms: responseStudy.data });
    const responseEnroll = await axios.get('https://raw.githubusercontent.com/garazaFRI/friappdata/master/data/enroll.html');
    this.setState({ enrollContent: responseEnroll.data });
  }

  render() {
    return (
      <ParallaxScrollView
        title="Študij"
        tabs={['PROGRAMI', 'VPIS']}
        backgroundImage={require('assets/header_images/study_tab.png')}
      >
        <StudyProgramsList studyPrograms={this.state.studyPrograms} {...this.props} />
        <EnrollView content={this.state.enrollContent} />
      </ParallaxScrollView>
    );
  }
}

export default StudyTabScreen;
