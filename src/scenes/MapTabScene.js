// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { NativeModules, NativeEventEmitter, View } from 'react-native';
import Mapbox from 'react-native-mapbox-gl';

import { MAPBOX_TOKEN } from 'config/api';
import { StyleSheet } from 'standard';
import Map from 'components/Map';
import MapButton from 'components/MapButton';

const { IndoorLocation } = NativeModules;
const EventEmitter = new NativeEventEmitter(IndoorLocation);

Mapbox.setAccessToken(MAPBOX_TOKEN);

@autobind
class MapTabScene extends Component {
  state: State;

  state: State = {
    userLocation: {
      coordinates: [46.050, 14.469],
      course: 0,
    },
    followingUserMode: false,
  };

  componentDidMount() {
    EventEmitter.addListener('onLocationChange', this.onLocationChange);
    IndoorLocation.startLocating();
  }

  onLocationChange(location: UserLocationType) {
    this.setState({ userLocation: location });
  }

  render() {
    return (
      <View style={styles.container}>
        <Map
          followingUserMode={this.state.followingUserMode}
          userLocation={this.state.userLocation}
        />
        <MapButton
          buttonEnabled={this.state.followingUserMode}
          onPress={() => this.setState({ followingUserMode: !this.state.followingUserMode })}
        />
      </View>
    );
  }
}

type State = {
  userLocation: UserLocationType,
  followingUserMode: boolean,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapTabScene;
