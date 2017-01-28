// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';

import ParallaxScrollView from 'components/ParallaxScrollView';
import CompaniesList from 'components/CompaniesList';

@autobind
class InfoTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Info"
        tabs={['PODJETJA', 'O FRI', 'LABORATORIJI']}
      >
        <CompaniesList />
      </ParallaxScrollView>
    );
  }
}

export default InfoTabScene;
