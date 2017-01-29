// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';

import ParallaxScrollView from 'components/ParallaxScrollView';
import EventList from 'components/EventList';
import events from 'data/events.json';

const days = Object.keys(events);

@autobind
class HomeTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Urnik"
        tabs={days}
      >
        {days.map((dayId, index) => (
          <EventList
            key={dayId}
            events={events[days[index]]}
          />
        ))}
      </ParallaxScrollView>
    );
  }
}

export default HomeTabScene;
