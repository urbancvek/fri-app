// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { Platform, NavigationExperimental, View } from 'react-native';
import { connect } from 'react-redux';

import { pushRouteAction, popRouteAction } from 'actions/navigationActions';

import type { NavigationState, NavigationRoute, NavigationSceneRendererProps } from 'NavigationTypeDefinition';

const { CardStack } = NavigationExperimental;

const Tabs = Platform.select({
  ios: () => require('tabs/ios').default,
  android: () => require('tabs/android').default,
})();

@autobind
class App extends Component {
  props: Props;

  renderScene(sceneProps: NavigationSceneRendererProps) {
    switch (sceneProps.scene.route.key) {
      case 'TABS': return <Tabs />;

      default: return <View />;
    }
  }

  render() {
    return (
      <CardStack
        direction="vertical"
        navigationState={this.props.navigationState}
        renderScene={this.renderScene}
        enableGestures={false}
      />
    );
  }
}

type Props = {
  navigationState: NavigationState,
  navigation: {
    pushRoute: (route: NavigationRoute) => void,
    popRoute: () => void,
  },
};

const select = ({ navigationStore }: ReducerType) => ({
  navigationState: navigationStore.routes,
});

const actions = (dispatch: Dispatch) => ({
  navigation: {
    pushRoute: (route) => dispatch(pushRouteAction(route)),
    popRoute: () => dispatch(popRouteAction()),
  },
});

export default connect(select, actions)(App);
