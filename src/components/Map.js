// @flow
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { MapView } from 'react-native-mapbox-gl';

import { StyleSheet } from 'standard';
import { MAPBOX_STYLE } from 'config/api';
import { createLocationAnnotation, createClassroomAnnotation } from 'helpers/annotationCreator';

type MapType = {
  easeTo: (options: {
    latitude: number, longitude: number,
    direction: number, pitch: number, altitude: number,
  }) => void,
};

const ALTITUDE = [
  {
    FOLLOWING: 35,
    OVERVIEW: 47,
  },
  {
    FOLLOWING: 55,
    OVERVIEW: 75,
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

const classrooms = {
  '0': [
    { id: 'PA', coordinates: [46.05044165258132, 14.468482176898281] },
  ],
  '1': [
    { id: 'P01', coordinates: [46.049980709616861, 14.468924203531223] },
    { id: 'P02', coordinates: [46.049868629164131, 14.468947273806316] },
    { id: 'P03', coordinates: [46.049798931961178, 14.468941845506292] },
    { id: 'P04', coordinates: [46.049728292814422, 14.468921489381213] },
    { id: 'P09', coordinates: [46.049769734458145, 14.469129121857025] },
    { id: 'P10', coordinates: [46.049846024675517, 14.469149477982103] },
    { id: 'P16', coordinates: [46.050398890139036, 14.469287899632647] },
    { id: 'P18', coordinates: [46.050483435936542, 14.46910000421782] },
    { id: 'P19', coordinates: [46.050417713266285, 14.46910000421782] },
    { id: 'P20', coordinates: [46.050345630247691, 14.469082693852048] },
    { id: 'P21', coordinates: [46.050280614111017, 14.469065383486276] },
    { id: 'G', coordinates: [46.050186888268421, 14.46904629117109] },
  ],
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

      return this.setMapCamera({ altitude, location, zoomLevel, pitch: 50 });
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

      return this.setMapCamera({ location, altitude, zoomLevel, pitch: 50 });
    }

    //
    // User walked from one floor to another and is in following user mode
    //
    if (this.props.currentFloor !== newProps.currentFloor && newProps.followingUserMode) {
      const location = newProps.userLocation;
      const altitude = ALTITUDE[newProps.userLocation.floor].FOLLOWING;
      const zoomLevel = ZOOM_LEVEL[newProps.userLocation.floor].FOLLOWING;

      return this.setMapCamera({ altitude, location, zoomLevel, pitch: 50 });
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
    const { userLocation, indoorLocation, currentFloor } = this.props;

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
          createLocationAnnotation(userLocation, indoorLocation),
          ...classrooms[currentFloor].map(createClassroomAnnotation),
        ]}

        styleURL={MAPBOX_STYLE}

        zoomEnabled={false}
        rotateEnabled
        pitchEnabled={false}
        onOpenAnnotation={(marker) => this.props.onOpenAnnotation(marker.id)}

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
  indoorLocation: boolean,
  onOpenAnnotation: (markerId: string) => void,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
