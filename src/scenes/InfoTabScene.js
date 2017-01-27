// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';

import ParallaxScrollView from 'components/ParallaxScrollView';

@autobind
class InfoTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Info"
        tabs={['PODJETJA', 'O FRI', 'LABORATORIJI']}
      >
      </ParallaxScrollView>
    );
  }
}

export default InfoTabScene;
