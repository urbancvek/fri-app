// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import ParallaxScrollView from 'components/ParallaxScrollView';
import ProgramsList from 'components/ProgramsList';

@autobind
class StudyTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Študij"
        tabs={['PROGRAMI', 'VPIS']}
      >
        <ProgramsList />
        <ScrollView />
      </ParallaxScrollView>
    );
  }
}

export default StudyTabScene;
