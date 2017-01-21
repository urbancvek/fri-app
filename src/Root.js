// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import App from 'App';
import { configureStore } from 'reducers/store';

@autobind
class Root extends Component {
  state: State;

  state: State = {
    isLoading: true,
    store: configureStore(() => this.setState({ isLoading: false })),
  }

  render() {
    const { isLoading, store } = this.state;

    if (isLoading) return <View />;

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

type State = {
  isLoading: boolean,
  store: Object,
};

export default Root;
