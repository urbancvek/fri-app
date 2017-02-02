// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { NativeModules, NativeEventEmitter, View } from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
import { connect } from 'react-redux';

import { MAPBOX_TOKEN } from 'config/api';
import { StyleSheet } from 'standard';
import Map from 'components/Map';
import MapButton from 'components/MapButton';
import { updateLocationAction } from 'actions/locationActions';

import type { ReducerType } from 'reducers';

const { IndoorLocation } = NativeModules;
const EventEmitter = new NativeEventEmitter(IndoorLocation);

Mapbox.setAccessToken(MAPBOX_TOKEN);

@autobind
class MapTabScene extends Component {
  props: Props;
  state: State;

  state: State = {
    followingUserMode: false,
  };

  componentDidMount() {
    EventEmitter.addListener('onLocationChange', this.onIndoorLocationChange);
    IndoorLocation.startLocating();
  }

  onIndoorLocationChange(location: UserLocationType) {
    this.props.updateLocation(location);
  }

  render() {
    return (
      <View style={styles.container}>
        <Map
          followingUserMode={this.state.followingUserMode}
          userLocation={this.props.currentLocation}
        />
        <MapButton
          buttonEnabled={this.state.followingUserMode}
          onPress={() => this.setState({ followingUserMode: !this.state.followingUserMode })}
        />
      </View>
    );
  }
}

type Props = {
  currentLocation: UserLocationType,
  updateLocation: (location: UserLocationType) => void,
};

type State = {
  followingUserMode: boolean,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const select = ({ locationStore }: ReducerType) => ({
  currentLocation: locationStore.currentLocation,
});

const actions = (dispatch: Dispatch) => ({
  updateLocation: (nextLocation: UserLocationType) => dispatch(updateLocationAction(nextLocation)),
});

export default connect(select, actions)(MapTabScene);
