// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParallaxScrollView from 'components/ParallaxScrollView';
import EventList from 'components/EventList';
import fetchAction from 'actions/fetchActions';
import { convertEventsToSections } from 'helpers/dataMassager';

import type { ReducerType } from 'reducers';

const days = ['first', 'second', 'third'];

@autobind
class HomeTabScene extends Component {
  props: Props;

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <ParallaxScrollView
        title="Urnik"
        tabs={['PET 10:00', 'PET 14:00', 'SOB 11:00']}
        backgroundImage={require('assets/header_images/home_tab.png')}
      >
        {days.map(dayId => (
          <EventList
            key={dayId}
            events={convertEventsToSections(this.props.events[dayId])}
          />
        ))}
      </ParallaxScrollView>
    );
  }
}

type Props = {
  events: {
    first: Array<EventType>,
    second: Array<EventType>,
    third: Array<EventType>,
  },
  fetchData: () => void,
};

const query = `
query EventsQuery {
  events {
    first {
      ...event
    }
    second {
      ...event
    }
    third {
      ...event
    }
  }
}

fragment event on Event {
  title
  startTime
  location
  accentColor
  description
  content
}
`;

const select = ({ dataStore }: ReducerType) => ({
  events: dataStore.events,
});

const actions = (dispatch: Dispatch) => ({
  fetchData: () => dispatch(fetchAction({ query })),
});

export default connect(select, actions)(HomeTabScene);
