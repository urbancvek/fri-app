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

const ALTITUDE = [
  {
    FOLLOWING: 35,
    OVERVIEW: 56,
  },
  {
    FOLLOWING: 45,
    OVERVIEW: 80,
  },
];

const ZOOM_LEVEL = [
  {
    FOLLOWING: 19.8,
    OVERVIEW: 19.7,
  },
  {
    FOLLOWING: 19.6,
    OVERVIEW: 19.3,
  },
];

const FLOOR_0_CENTER = {
  coordinates: [46.0501258, 14.4683886],
  course: 10,
};

class Map extends Component {
  props: Props;

  map: MapType;

  componentWillReceiveProps(newProps: Props) {
    //
    // User clicked on change floor button
    //
    if (this.props.currentFloor !== newProps.currentFloor && !newProps.followingUserMode) {
      const location = FLOOR_0_CENTER;
      const altitude = ALTITUDE[newProps.currentFloor].OVERVIEW;
      const zoomLevel = ZOOM_LEVEL[newProps.currentFloor].OVERVIEW;

      return this.setMapCamera({ altitude, location, zoomLevel });
    }

    //
    // User entered following user mode
    //
    if (this.props.followingUserMode !== newProps.followingUserMode && newProps.followingUserMode) {
      const location = newProps.userLocation;
      const altitude = ALTITUDE[newProps.userLocation.floor].FOLLOWING;
      const zoomLevel = ZOOM_LEVEL[newProps.userLocation.floor].FOLLOWING;

      return this.setMapCamera({ altitude, location, zoomLevel, pitch: 60 });
    }

    //
    // User exited following user mode
    //
    if (this.props.followingUserMode !== newProps.followingUserMode && !newProps.followingUserMode) {
      const location = newProps.userLocation;
      const altitude = ALTITUDE[newProps.userLocation.floor].OVERVIEW;
      const zoomLevel = ZOOM_LEVEL[newProps.userLocation.floor].OVERVIEW;

      return this.setMapCamera({ altitude, location, zoomLevel });
    }

    //
    // User's location changed while in following user mode
    //
    if (this.props.userLocation !== newProps.userLocation && newProps.followingUserMode) {
      const location = newProps.userLocation;
      const altitude = ALTITUDE[newProps.userLocation.floor].FOLLOWING;
      const zoomLevel = ZOOM_LEVEL[newProps.userLocation.floor].FOLLOWING;

      return this.setMapCamera({ location, altitude, zoomLevel, pitch: 60 });
    }

    //
    // User walked from one floor to another and is in following user mode
    //
    if (this.props.currentFloor !== newProps.currentFloor && newProps.followingUserMode) {
      const location = newProps.userLocation;
      const altitude = ALTITUDE[newProps.userLocation.floor].FOLLOWING;
      const zoomLevel = ZOOM_LEVEL[newProps.userLocation.floor].FOLLOWING;

      return this.setMapCamera({ altitude, location, zoomLevel, pitch: 60 });
    }

    return;
  }

  setMapCamera({ altitude, location, zoomLevel, pitch = 40 }) {
    const options = Platform.select({
      ios: { altitude },
      android: { zoomLevel },
    });

    this.map.easeTo({
      latitude: location.coordinates[0],
      longitude: location.coordinates[1],
      direction: location.course,
      pitch,
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
        onFinishLoadingMap={() => this.setMapCamera({
          altitude: ALTITUDE[1].OVERVIEW,
          location: FLOOR_0_CENTER,
          zoomLevel: ZOOM_LEVEL[1].OVERVIEW,
        })}

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
  currentFloor: number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
