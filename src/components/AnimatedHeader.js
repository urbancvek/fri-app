// @flow
import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

import { StyleSheet } from 'standard';
import SlidingChooser from 'components/SlidingChooser';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 97;

class AnimatedHeader extends Component {
  props: Props;
  state: State;

  state: State = {
    backgroundOffsetX: new Animated.Value(0),
  };

  componentWillReceiveProps(newProps: Props) {
    if (this.props.selectedPage !== newProps.selectedPage) {
      const { imageWidth, tabs } = newProps;

      const amountToScroll = (imageWidth - width) / (tabs.length - 1);
      const config = {
        toValue: newProps.selectedPage * -amountToScroll,
        duration: 300,
      };

      Animated.timing(this.state.backgroundOffsetX, config).start();
    }
  }

  render() {
    const { headerHeight } = this.props;

    const backgroundOffsetY = headerHeight.interpolate({
      inputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
      outputRange: [-80, 0],
    });

    const fontSize = headerHeight.interpolate({
      inputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
      outputRange: [20, 34],
    });

    const titleOffsetY = headerHeight.interpolate({
      inputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
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
          {this.props.title}
        </Animated.Text>
        <SlidingChooser
          tabs={this.props.tabs}
          selectedPage={this.props.selectedPage}
          scrollToPage={this.props.scrollToPage}
        />
      </Animated.View>
    );
  }
}

type Props = {
  tabs: Array<string>,
  title: string,
  headerHeight: Animated.Value,
  imageWidth: number,
  children?: any,
  selectedPage: number,
  scrollToPage: Function,
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
