// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import { MAPBOX_TOKEN } from 'config/api';
import { StyleSheet } from 'standard';
import Map from 'components/Map';
import MapButton from 'components/MapButton';

const Screen = Dimensions.get('window');

const upstairsIcon = require('assets/map_icons/upstairs.png');
const downstairsIcon = require('assets/map_icons/downstairs.png');

Mapbox.setAccessToken(MAPBOX_TOKEN);

type Props = {};

type State = {
  events: Array<EventType>,
  currentFloor: number,
};

@autobind
class MapTabScreen extends Component<Props, State> {
  static navigatorStyle = {
    navBarHidden: true,
  };

  watchID: any;

  state: State = {
    currentFloor: 1,
  };

  render() {
    const { currentFloor } = this.state;

    return (
      <View style={styles.container}>
        <Map currentFloor={currentFloor} />

        <MapButton
          buttonEnabled={currentFloor === 0}
          onPress={() => this.setState({
            currentFloor: currentFloor === 0 ? 1 : 0,
          })}
          icon={downstairsIcon}
          filledIcon={upstairsIcon}
          underlayColor="#444444"
          backgroundColor="#333333"
          bottomOffset={20}
          tintColor="white"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Screen.height - 44,
    width: Screen.width,
  },
});

export default MapTabScreen;
