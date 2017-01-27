// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';

import ParallaxScrollView from 'components/ParallaxScrollView';
import EventList from 'components/EventList';

@autobind
class HomeTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Urnik"
        tabs={['10.2. DOP', '10.2. POP', '11.2. DOP']}
      >
        <EventList />
        <EventList />
        <EventList />
      </ParallaxScrollView>
    );
  }
}

export default HomeTabScene;
