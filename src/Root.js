// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, StatusBar, Image, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import Raven from 'raven-js';
import ravenReactNative from 'raven-js/plugins/react-native';

import App from 'App';
import { configureStore } from 'reducers/store';

const { width, height } = Dimensions.get('window');

if (process.env.NODE_ENV === 'production') {
  ravenReactNative(Raven);
  Raven.config('https://229d4bd9491c4b73bc9b13d2d0c819e5@sentry.io/137237').install();
}

@autobind
class Root extends Component {
  state: State;

  state: State = {
    isLoading: true,
    store: configureStore(() => this.setState({ isLoading: false })),
  }

  render() {
    const { isLoading, store } = this.state;

    if (isLoading) {
      return (
        <Image
          source={require('assets/stock/loading_screen.png')}
          style={{ height, width }}
        />
      );
    }

    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <StatusBar
            animated
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <App />
        </View>
      </Provider>
    );
  }
}

type State = {
  isLoading: boolean,
  store: Object,
};

export default Root;
