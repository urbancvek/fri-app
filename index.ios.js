// @flow
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Root from 'Root';

class FRI extends Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('FRI', () => FRI);
