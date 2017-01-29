// @flow
import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';

import { StyleSheet } from 'standard';

class CardView extends Component {
  props: Props;
  state: State;
  context: Context;

  state: State = {
    animatedIntro: new Animated.Value(0),
  };

  componentWillMount() {
    Animated.timing(this.state.animatedIntro, { toValue: 1, duration: 500 }).start();
  }

  render() {
    const { header, children } = this.props;
    const { navigation } = this.context;

    const backgroundColor = this.state.animatedIntro.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(56, 74, 84, 0)', 'rgba(56, 74, 84, 0.9)'],
    });

    return (
      <Animated.View style={[styles.background, { backgroundColor }]}>
        <View style={styles.container}>
          <View style={styles.header}>
            {header}
            <TouchableOpacity
              onPress={() => navigation.popRoute()}
              style={styles.closeButtonContainer}
            >
              <Image
                source={require('assets/utils/close_button.png')}
                style={styles.closeButton}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            {children}
          </ScrollView>
        </View>
      </Animated.View>
    );
  }
}

CardView.contextTypes = {
  navigation: React.PropTypes.object,
};

type Props = {
  header: any,
  children?: any,
};

type State = {
  animatedIntro: Animated.Value,
};

type Context = {
  navigation: {
    popRoute: () => void,
  },
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    marginTop: 45,
    marginHorizontal: 14,
    marginBottom: 15,
    backgroundColor: 'white',
    paddingTop: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 35,
    width: 35,
    alignItems: 'flex-end',
  },
  closeButton: {
    height: 25,
    width: 25,
  },
  content: {
    paddingBottom: 30,
  },
});

export default CardView;
