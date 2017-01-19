// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

@autobind
class Root extends Component {
  render() {
    return (
      <View>
        <Text>Root</Text>
      </View>
    );
  }
}

export default Root;
