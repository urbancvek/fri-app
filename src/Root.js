// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, StatusBar, Image, Dimensions } from 'react-native';
import { Provider } from 'react-redux';

import App from 'App';
import { configureStore } from 'reducers/store';

const { width, height } = Dimensions.get('window');

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
