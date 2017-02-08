// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { NativeModules, NativeEventEmitter, NativeAppEventEmitter, View } from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
import { connect } from 'react-redux';
import BLE from 'react-native-ble-manager';
import geolib from 'geolib';

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

const BUILDING_X_FLOOR_0 = 'c3bc400d-888c-446c-a17b-d2b71797fbe6';
const BUILDING_X_FLOOR_1 = 'f33ac7d8-059d-4727-bb49-7609bc82d0b2';
const BUILDING_FRI_FLOOR_1 = '5ea15b19-b7fd-40a3-833b-666c514279d7';

Mapbox.setAccessToken(MAPBOX_TOKEN);

@autobind
class MapTabScene extends Component {
  props: Props;
  state: State;
  context: Context;

  watchID: any;

  state: State = {
    followingUserMode: false,
    currentFloor: 1,
    bleState: false,
    isOnFRI: false,
    indoorLocation: false,
  };

  componentDidMount() {
    EventEmitter.addListener('DID_UPDATE_LOCATION', this.onIndoorLocationChange);
    EventEmitter.addListener('DID_ENTER_REGION', this.onEnterRegionChange);
    NativeAppEventEmitter.addListener('BleManagerDidUpdateState', this.onBluetoothStateChange);

    // Starts bluetooth monitoring
    BLE.start({ showAlert: false });
    BLE.checkState();

    // Start watching geolocation
    this.watchID = navigator.geolocation.watchPosition(
      this.onGPSLocationChange,
      error => console.log(error),
    );
  }

  componentWillUnmount() {
    IndoorLocation.stopLocating();
  }

  componentDidUpdate() {
    // If both bluetooth is on and the user is on FRI start indoor location
    if (this.state.isOnFRI && this.state.bleState && !this.state.indoorLocation) {
      this.setState({ indoorLocation: true });
      IndoorLocation.startLocating();
    }
  }

  onIndoorLocationChange(location: UserLocationType) {
    this.props.updateLocation(location);
  }

  onEnterRegionChange(identifier: string) {
    switch (identifier) {
      case BUILDING_X_FLOOR_0: {
        console.log('BUILDING_X_FLOOR_0'); break;
      }

      case BUILDING_X_FLOOR_1: {
        console.log('BUILDING_X_FLOOR_1'); break;
      }

      case BUILDING_FRI_FLOOR_1: {
        console.log('BUILDING_FRI_FLOOR_1'); break;
      }

      default: {
        console.log(identifier);
      }
    }
  }

  onBluetoothStateChange({ state }) {
    if (state === 'on') this.setState({ bleState: true });
    else this.setState({ bleState: false });
  }

  onGPSLocationChange({ coords }) {
    const location = { coordinates: [coords.latitude, coords.longitude], course: coords.heading };

    // Get the distance to center of FRI
    const distance = geolib.getDistanceSimple(
      { latitude: location.coordinates[0], longitude: location.coordinates[1] },
      { latitude: 46.050186888268421, longitude: 14.46904629117109 }
    );

    // If close enough stop watching GPS and move to the next stage
    if (distance < 300) {
      navigator.geolocation.clearWatch(this.watchID);
      this.setState({ isOnFRI: true });
    }
  }

  onOpenAnnotation(markerId) {
    const event = this.props.events.find((e: EventType) =>
      e.location.includes(markerId),
    );

    if (event) this.context.navigation.pushRoute({ key: 'EVENT', event });
  }

  render() {
    const { followingUserMode, currentFloor } = this.state;

    return (
      <View style={styles.container}>
        <Map
          followingUserMode={followingUserMode}
          userLocation={this.props.currentLocation}
          indoorLocation={this.state.indoorLocation}
          currentFloor={currentFloor}
          onOpenAnnotation={this.onOpenAnnotation}
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

MapTabScene.contextTypes = {
  navigation: PropTypes.object,
};

type Props = {
  currentLocation: UserLocationType,
  updateLocation: (location: UserLocationType) => void,
  events: Array<EventType>,
};

type State = {
  followingUserMode: boolean,
  currentFloor: number,
  bleState: boolean,
  isOnFRI: boolean,
  indoorLocation: boolean,
};

type Context = {
  navigation: {
    pushRoute: (route: RouteType) => void,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const select = ({ locationStore, dataStore }: ReducerType) => ({
  currentLocation: locationStore.currentLocation,
  events: dataStore.events.first,
});

const actions = (dispatch: Dispatch) => ({
  updateLocation: (nextLocation: UserLocationType) => dispatch(updateLocationAction(nextLocation)),
});

export default connect(select, actions)(MapTabScene);
