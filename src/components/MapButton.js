// @flow
import React from 'react';
import { TouchableHighlight, Image } from 'react-native';

import { StyleSheet } from 'standard';

const locationIcon = require('assets/map_icons/location.png');
const locationFilledIcon = require('assets/map_icons/location_filled.png');

const MapButton = (props: MapButtonProps) => (
  <TouchableHighlight
    onPress={() => props.onPress()}
    style={mapButtonStyles.wrapper}
    underlayColor="white"
  >
    <Image
      source={props.buttonEnabled ? locationFilledIcon : locationIcon}
      style={mapButtonStyles.buttonImage}
    />
  </TouchableHighlight>
);

type MapButtonProps = {
  onPress: () => void,
  buttonEnabled: boolean,
};

const mapButtonStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    bottom: 20,
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  buttonImage: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    tintColor: '#1482C5',
  },
});

export default MapButton;
