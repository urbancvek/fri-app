// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';

import { MAPBOX_TOKEN, MAPBOX_STYLE } from 'config/api';

Mapbox.setAccessToken(MAPBOX_TOKEN);

@autobind
class Root extends Component {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Root;
