// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';

import ParallaxScrollView from 'components/ParallaxScrollView';
import AboutShopsterView from 'components/AboutShopsterView';
import OurWorkShopsterView from 'components/OurWorkShopsterView';
import AboutGarazaView from 'components/AboutGarazaView';
import aboutShopsterContent from 'data/aboutShopster';
import ourWorkShopsterContent from 'data/ourWorkShopster';
import aboutGarazaContent from 'data/aboutGaraza';

@autobind
class ShopsterTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Shopster"
        tabs={['O NAS', 'KAJ POČNEMO', 'GARAŽA']}
        backgroundImage={require('assets/header_images/fri_background.png')}
      >
        <AboutShopsterView content={aboutShopsterContent} />
        <OurWorkShopsterView content={ourWorkShopsterContent} />
        <AboutGarazaView content={aboutGarazaContent} />
      </ParallaxScrollView>
    );
  }
}

export default ShopsterTabScene;
