// @flow
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { MapView } from 'react-native-mapbox-gl';

import { StyleSheet } from 'standard';
import { MAPBOX_STYLE } from 'config/api';

type MapType = {
  easeTo: (options: {
    latitude: number, longitude: number,
    direction: number, pitch: number, altitude: number,
  }) => void,
};

class Map extends Component {
  props: Props;

  map: MapType;

  componentWillReceiveProps() {
    this.setMapCamera();
  }

  setMapCamera() {
    const { userLocation } = this.props;

    const options = Platform.select({
      ios: {
        altitude: 10,
      },
      android: {
        zoomLevel: 19.5,
      },
    });

    this.map.easeTo({
      latitude: userLocation.coordinates[0],
      longitude: userLocation.coordinates[1],
      direction: userLocation.course,
      pitch: 70,
      ...options,
    });
  }

  render() {
    return (
      <MapView
        ref={(map: MapType) => this.map = map}
        style={styles.container}

        attributionButtonIsHidden
        logoIsHidden
        compassIsHidden
        annotationsAreImmutable

        styleURL={MAPBOX_STYLE}

        zoomEnabled={false}
        rotateEnabled
      />
    );
  }
}

type Props = {
  userLocation: UserLocationType,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
