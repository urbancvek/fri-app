// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

@autobind
class HomeTabScene extends Component {
  render() {
    return (
      <View>
        <Text>HomeTabScene</Text>
      </View>
    );
  }
}

export default HomeTabScene;
