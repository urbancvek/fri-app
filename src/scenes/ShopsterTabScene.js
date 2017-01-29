// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import ParallaxScrollView from 'components/ParallaxScrollView';

@autobind
class ShopsterTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Shopster"
        tabs={['O NAS']}
        backgroundImage={require('assets/header_images/fri_background.png')}
      >
        <ScrollView />
      </ParallaxScrollView>
    );
  }
}

export default ShopsterTabScene;
