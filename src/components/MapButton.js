// @flow
import React from 'react';
import { TouchableHighlight, Image } from 'react-native';

import { StyleSheet } from 'standard';

const MapButton = (props: MapButtonProps) => (
  <TouchableHighlight
    onPress={() => props.onPress()}
    style={[mapButtonStyles.wrapper, { bottom: props.bottomOffset, backgroundColor: props.backgroundColor }]}
    underlayColor={props.underlayColor}
  >
    <Image
      resizeMode="contain"
      source={props.buttonEnabled ? props.filledIcon : props.icon}
      style={[mapButtonStyles.buttonImage, { tintColor: props.tintColor }]}
    />
  </TouchableHighlight>
);

type MapButtonProps = {
  onPress: () => void,
  buttonEnabled: boolean,
  underlayColor: string,
  icon: any,
  filledIcon: any,
  bottomOffset: number,
  backgroundColor: string,
  tintColor: string,
};

const mapButtonStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
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
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});

export default MapButton;
