// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParallaxScrollView from 'components/ParallaxScrollView';
import AboutShopsterView from 'components/AboutShopsterView';
import OurWorkShopsterView from 'components/OurWorkShopsterView';
import AboutGarazaView from 'components/AboutGarazaView';
import fetchAction from 'actions/fetchActions';

import type { ReducerType } from 'reducers';

@autobind
class ShopsterTabScene extends Component {
  props: Props;

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <ParallaxScrollView
        title="Shopster"
        image={require('assets/stock/shopster_logo.png')}
        tabs={['O NAS', 'KAJ POČNEMO', 'GARAŽA']}
        backgroundImage={require('assets/header_images/shopster_tab.png')}
      >
        <AboutShopsterView content={this.props.aboutShopsterContent} />
        <OurWorkShopsterView content={this.props.ourWorkShopsterContent} />
        <AboutGarazaView content={this.props.aboutGarazaContent} />
      </ParallaxScrollView>
    );
  }
}

type Props = {
  aboutShopsterContent: string,
  ourWorkShopsterContent: string,
  aboutGarazaContent: string,
  fetchData: () => void,
};

const query = `
{
  data {
    aboutShopster
    ourWorkShopster
    aboutGaraza
  }
}
`;

const select = ({ dataStore }: ReducerType) => ({
  aboutShopsterContent: dataStore.data.aboutShopster,
  ourWorkShopsterContent: dataStore.data.ourWorkShopster,
  aboutGarazaContent: dataStore.data.aboutGaraza,
});

const actions = (dispatch: Dispatch) => ({
  fetchData: () => dispatch(fetchAction({ query })),
});

export default connect(select, actions)(ShopsterTabScene);
