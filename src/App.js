// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { NavigationExperimental, View, BackAndroid } from 'react-native';
import { connect } from 'react-redux';

import Tabs from 'tabs';
import EventScene from 'scenes/EventScene';
import CompanyScene from 'scenes/CompanyScene';
import LabCardScene from 'scenes/LabCardScene';
import { pushRouteAction, popRouteAction } from 'actions/navigationActions';

import type { NavigationState, NavigationRoute, NavigationSceneRendererProps } from 'NavigationTypeDefinition';

const { CardStack } = NavigationExperimental;

@autobind
class App extends Component {
  props: Props;

  getChildContext() {
    return {
      navigation: this.props.navigation,
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      // If false is returned the app will exit
      if (this.props.navigationState.index === 0) return false;

      return this.props.navigation.popRoute();
    });
  }

  renderScene(sceneProps: NavigationSceneRendererProps) {
    switch (sceneProps.scene.route.key) {
      case 'TABS': return <Tabs />;
      case 'EVENT': return <EventScene event={sceneProps.scene.route.event} />;
      case 'COMPANY': return <CompanyScene company={sceneProps.scene.route.company} />;
      case 'LAB': return <LabCardScene company={sceneProps.scene.route.lab} />;

      default: return <View />;
    }
  }

  render() {
    return (
      <CardStack
        direction="vertical"
        cardStyle={{ backgroundColor: 'transparent', opacity: 1 }}
        navigationState={this.props.navigationState}
        renderScene={this.renderScene}
        enableGestures={false}
      />
    );
  }
}

App.childContextTypes = {
  navigation: React.PropTypes.object,
};

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
