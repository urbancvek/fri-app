// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import ParallaxScrollView from 'components/ParallaxScrollView';
import CompaniesList from 'components/CompaniesList';
import LabsList from 'components/LabsList';

@autobind
class InfoTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Info"
        tabs={['PODJETJA', 'O FRI', 'LABORATORIJI']}
      >
        <CompaniesList />
        <ScrollView />
        <LabsList />
      </ParallaxScrollView>
    );
  }
}

export default InfoTabScene;
