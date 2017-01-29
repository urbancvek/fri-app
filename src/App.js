// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { NavigationExperimental, View, BackAndroid } from 'react-native';
import { connect } from 'react-redux';

import Tabs from 'tabs';
import EventCardScene from 'scenes/EventCardScene';
import CompanyCardScene from 'scenes/CompanyCardScene';
import LabCardScene from 'scenes/LabCardScene';
import StudyProgramCardScene from 'scenes/StudyProgramCardScene';
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
    const { route } = sceneProps.scene;

    switch (route.key) {
      case 'TABS': return <Tabs />;
      case 'EVENT': return <EventCardScene event={route.event} />;
      case 'COMPANY': return <CompanyCardScene company={route.company} />;
      case 'LAB': return <LabCardScene lab={route.lab} />;
      case 'STUDY_PROGRAM': return <StudyProgramCardScene studyProgram={route.studyProgram} />;

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
