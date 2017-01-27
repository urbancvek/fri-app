// @flow
import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

import { StyleSheet } from 'standard';

const { width } = Dimensions.get('window');

class AnimatedHeader extends Component {
  props: Props;
  state: State;

  state: State = {
    backgroundOffsetX: new Animated.Value(0),
  };

  componentWillReceiveProps(newProps: Props) {
    if (this.props.selectedPage !== newProps.selectedPage) {
      const config = {
        toValue: newProps.selectedPage * -30,
        duration: 300,
      };

      Animated.timing(this.state.backgroundOffsetX, config).start();
    }
  }

  render() {
    const { headerHeight, children } = this.props;

    const backgroundOffsetY = headerHeight.interpolate({
      inputRange: [97, 200],
      outputRange: [-80, 0],
    });

    const fontSize = headerHeight.interpolate({
      inputRange: [97, 200],
      outputRange: [20, 34],
    });

    const titleOffsetY = headerHeight.interpolate({
      inputRange: [97, 200],
      outputRange: [-10, -40],
    });

    const backgroundTransforms = [
      { translateY: backgroundOffsetY },
      { translateX: this.state.backgroundOffsetX },
    ];

    return (
      <Animated.View style={[styles.container, { height: headerHeight }]}>
        <Animated.Image
          style={[styles.backgroundImage, { transform: backgroundTransforms }]}
          source={require('assets/header_images/fri_background.png')}
        />
        <Animated.Text style={[styles.title, { fontSize, transform: [{ translateY: titleOffsetY }] }]}>
          Urnik
        </Animated.Text>
        {children}
      </Animated.View>
    );
  }
}

type Props = {
  headerHeight: Animated.Value,
  children?: any,
  selectedPage: number,
};

type State = {
  backgroundOffsetX: Animated.Value,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    zIndex: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'Regular',
    textAlign: 'center',
    width,
  },
});

export default AnimatedHeader;
