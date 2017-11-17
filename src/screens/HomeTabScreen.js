// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import axios from 'axios';

import ParallaxScrollView from 'components/ParallaxScrollView';
import EventList from 'components/EventList';

type Props = {

};

type State = {

};

@autobind
class HomeTabScreen extends Component<Props, State> {
  state = {
    days: {
      first: [],
      second: [],
      third: [],
    },
  };

  static navigatorStyle = {
    navBarHidden: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const response = await axios.get('https://raw.githubusercontent.com/garazaFRI/friappdata/master/data/events.json');
    this.setState({ days: response.data });
  }

  render() {
    return (
      <ParallaxScrollView
        title="Urnik"
        tabs={['PET 11:00', 'PET 15:30', 'SOB 10:00']}
        backgroundImage={require('assets/header_images/home_tab.png')}
      >
        {Object.keys(this.state.days).map(dayId => (
          <EventList
            key={dayId}
            events={this.state.days[dayId]}
            {...this.props}
          />
        ))}
      </ParallaxScrollView>
    );
  }
}

export default HomeTabScreen;
