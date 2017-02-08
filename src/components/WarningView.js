// @flow
import React, { Component } from 'react';
import { View, Text, Image, Animated } from 'react-native';

import { StyleSheet } from 'standard';

class WarningView extends Component {
  props: Props;
  state: State;

  state: State = {
    topOffset: new Animated.Value(-100),
  };

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.isOnFRI && !newProps.bleState) {
      Animated.spring(this.state.topOffset, { toValue: 25 }).start();
    } else {
      Animated.spring(this.state.topOffset, { toValue: -100 }).start();
    }
  }

  render() {
    return (
      <Animated.View style={[styles.wrapper, { top: this.state.topOffset }]}>
        <View style={styles.main}>
          <Image
            source={require('assets/map_icons/ble.png')}
            style={styles.ble}
          />
          <Text style={styles.text}>
            Vklopite Bluetooth
          </Text>
        </View>
        <Image source={require('assets/map_icons/powered_by.png')} />
      </Animated.View>
    );
  }
}

type State = {
  topOffset: Animated.Value,
};

type Props = {
  isOnFRI: boolean,
  bleState: boolean,
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 14,
    right: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#323232dd',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    padding: 15,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ble: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'Light',
    color: 'white',
  },
});

export default WarningView;
