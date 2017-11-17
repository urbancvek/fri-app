// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';

import { StyleSheet } from 'standard';

const Screen = Dimensions.get('window');

type Props = {
  header: any,
  children?: any,
};

@autobind
class CardView extends Component<Props, State> {
  render() {
    const { header, children } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {header}
          <TouchableOpacity
            onPress={() => this.props.navigator.dismissLightBox()}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: Screen.height / 15,
    // marginHorizontal: Screen.width / 30,
    // marginBottom: Screen.width / 30,
    height: Screen.height - 60,
    width: Screen.width - 30,
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
    right: -15,
    top: -15,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
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
