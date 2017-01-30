// @flow
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { MapView } from 'react-native-mapbox-gl';

import { StyleSheet } from 'standard';
import { MAPBOX_STYLE } from 'config/api';
import { createLocationAnnotation } from 'helpers/annotationCreator';

type MapType = {
  easeTo: (options: {
    latitude: number, longitude: number,
    direction: number, pitch: number, altitude: number,
  }) => void,
};

class Map extends Component {
  props: Props;

  map: MapType;

  componentWillReceiveProps(newProps: Props) {
    if (this.props.followingUserMode && !newProps.followingUserMode) {
      this.setMapCamera(true);
    } else if (!this.props.followingUserMode && newProps.followingUserMode) {
      this.setMapCamera(false);
    }

    if (this.props.userLocation !== newProps.userLocation) {
      if (this.props.followingUserMode) this.setMapCamera(false);
    }
  }

  setMapCamera(goToOverview: boolean) {
    const { userLocation } = this.props;

    const options = Platform.select({
      ios: {
        altitude: goToOverview ? 50 : 10,
      },
      android: {
        zoomLevel: goToOverview ? 19 : 19.5,
      },
    });

    this.map.easeTo({
      latitude: userLocation.coordinates[0],
      longitude: userLocation.coordinates[1],
      direction: userLocation.course,
      pitch: goToOverview ? 30 : 70,
      ...options,
    });
  }

  render() {
    const { userLocation } = this.props;

    return (
      <MapView
        ref={(map: MapType) => this.map = map}
        style={styles.container}
        contentInset={[200, 0, 0, 0]}

        attributionButtonIsHidden
        logoIsHidden
        compassIsHidden
        annotationsAreImmutable

        annotations={[
          createLocationAnnotation(userLocation),
        ]}

        styleURL={MAPBOX_STYLE}

        zoomEnabled={false}
        rotateEnabled

        onStartLoadingMap={() => {}}
        onFinishLoadingMap={() => this.setMapCamera(false)}

        initialZoomLevel={18}
        initialCenterCoordinate={{
          latitude: userLocation.coordinates[0],
          longitude: userLocation.coordinates[1],
        }}
      />
    );
  }
}

type Props = {
  userLocation: UserLocationType,
  followingUserMode: boolean,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
