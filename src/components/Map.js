// @flow
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import { StyleSheet } from 'standard';
import { MAPBOX_STYLE } from 'config/api';
import { createLocationAnnotation, createClassroomAnnotation } from 'helpers/annotationCreator';

const Screen = Dimensions.get('window');

type MapType = {
  setCamera: (options: {
    centerCoordinate: [number, number],
    zoom: number,
    duration: number,
  }) => void,
};

const ZOOM_LEVELS = [19.7, 19.3];
const FRI_CENTER = [[14.4683886, 46.0501258], [14.46904629117109, 46.050186888268421]]

const classrooms = {
  '0': [
    { id: 'PA', coordinates: [14.468482176898281, 46.05044165258132] },
  ],
  '1': [
    { id: 'P01', coordinates: [14.468924203531223, 46.049980709616861] },
    { id: 'P02', coordinates: [14.468947273806316, 46.049868629164131] },
    { id: 'P03', coordinates: [14.468941845506292, 46.049798931961178] },
    { id: 'P04', coordinates: [14.468921489381213, 46.049728292814422] },
    { id: 'P09', coordinates: [14.469129121857025, 46.049769734458145] },
    { id: 'P10', coordinates: [14.469149477982103, 46.049846024675517] },
    { id: 'P16', coordinates: [14.469287899632647, 46.050398890139036] },
    { id: 'P18', coordinates: [14.46910000421782, 46.050483435936542] },
    { id: 'P19', coordinates: [14.46910000421782, 46.050417713266285] },
    { id: 'P20', coordinates: [14.469082693852048, 46.050345630247691] },
    { id: 'P21', coordinates: [14.469065383486276, 46.050280614111017] },
    { id: 'G', coordinates: [14.46904629117109, 46.050186888268421] },
  ],
};

type Props = {
  currentFloor: number,
};

class Map extends Component<Props> {
  map: MapType;

  componentWillReceiveProps(newProps: Props) {
    //
    // User clicked on change floor button
    //
    if (this.props.currentFloor !== newProps.currentFloor && !newProps.followingUserMode) {
      const coordinates = FRI_CENTER[newProps.currentFloor];
      const zoomLevel = ZOOM_LEVELS[newProps.currentFloor];

      this.setMapCamera({ coordinates, zoomLevel });
    }
  }

  setMapCamera({ coordinates, zoomLevel }) {
    this.map.setCamera({
      centerCoordinate: coordinates,
      zoom: zoomLevel,
      duration: 300,
    });
  }

  render() {
    const { userLocation, indoorLocation, currentFloor } = this.props;

    return (
      <MapboxGL.MapView
        ref={(map: MapType) => this.map = map}
        style={styles.container}
        contentInset={[200, 0, 0, 0]}

        attributionEnabled={false}
        logoEnabled={false}
        compassEnabled={false}

        styleURL={MAPBOX_STYLE}

        zoomEnabled={false}
        pitchEnabled={false}

        zoomLevel={ZOOM_LEVELS[1]}
        centerCoordinate={FRI_CENTER[1]}
        pitch={20}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Screen.height - 44,
    width: Screen.width,
  },
});

export default Map;
