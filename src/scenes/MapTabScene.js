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

const locationIcon = require('assets/map_icons/location.png');
const locationFilledIcon = require('assets/map_icons/location_filled.png');
const upstairsIcon = require('assets/map_icons/upstairs.png');
const downstairsIcon = require('assets/map_icons/downstairs.png');

Mapbox.setAccessToken(MAPBOX_TOKEN);

@autobind
class MapTabScene extends Component {
  props: Props;
  state: State;

  state: State = {
    followingUserMode: false,
    currentFloor: 1,
  };

  componentDidMount() {
    EventEmitter.addListener('onLocationChange', this.onIndoorLocationChange);
    IndoorLocation.startLocating();
  }

  onIndoorLocationChange(location: UserLocationType) {
    this.props.updateLocation(location);
  }

  render() {
    const { followingUserMode, currentFloor } = this.state;

    return (
      <View style={styles.container}>
        <Map
          followingUserMode={followingUserMode}
          userLocation={this.props.currentLocation}
          currentFloor={currentFloor}
        />
        <MapButton
          buttonEnabled={followingUserMode}
          onPress={() => this.setState({
            followingUserMode: !this.state.followingUserMode,
            currentFloor: this.props.currentLocation.floor,
          })}
          icon={locationIcon}
          filledIcon={locationFilledIcon}
          underlayColor="#eee"
          backgroundColor="white"
          bottomOffset={90}
          tintColor="#333333"
        />
        <MapButton
          buttonEnabled={currentFloor === 0}
          onPress={() => this.setState({
            currentFloor: currentFloor === 0 ? 1 : 0,
            followingUserMode: false,
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

type Props = {
  currentLocation: UserLocationType,
  updateLocation: (location: UserLocationType) => void,
};

type State = {
  followingUserMode: boolean,
  currentFloor: number,
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
