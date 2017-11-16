// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import axios from 'axios';

import ParallaxScrollView from 'components/ParallaxScrollView';
import AboutShopsterView from 'components/AboutShopsterView';
import OurWorkShopsterView from 'components/OurWorkShopsterView';
import AboutGarazaView from 'components/AboutGarazaView';

type Props = {};
type State = {
  aboutShopsterContent: string,
  ourWorkShopsterContent: string,
  aboutGarazaContent: string,
};

@autobind
class ShopsterTabScreen extends Component<Props, State> {
  static navigatorStyle = {
    navBarHidden: true,
  };

  state = {
    aboutShopsterContent: '<div />',
    ourWorkShopsterContent: '<div />',
    aboutGarazaContent: '<div />',
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const aboutShopsterResponse = await axios.get('https://raw.githubusercontent.com/garazaFRI/friappdata/master/data/aboutShopster.html');
    this.setState({ aboutShopsterContent: aboutShopsterResponse.data });

    const ourWorkResponse = await axios.get('https://raw.githubusercontent.com/garazaFRI/friappdata/master/data/ourWorkShopster.html');
    this.setState({ ourWorkShopsterContent: ourWorkResponse.data });

    const aboutGarazaResponse = await axios.get('https://raw.githubusercontent.com/garazaFRI/friappdata/master/data/aboutGaraza.html');
    this.setState({ aboutGarazaContent: aboutGarazaResponse.data });
  }

  render() {
    return (
      <ParallaxScrollView
        title="Shopster"
        image={require('assets/stock/shopster_logo.png')}
        tabs={['O NAS', 'KAJ POČNEMO', 'GARAŽA']}
        backgroundImage={require('assets/header_images/shopster_tab.png')}
      >
        <AboutShopsterView content={this.state.aboutShopsterContent} />
        <OurWorkShopsterView content={this.state.ourWorkShopsterContent} />
        <AboutGarazaView content={this.state.aboutGarazaContent} />
      </ParallaxScrollView>
    );
  }
}

export default ShopsterTabScreen;
