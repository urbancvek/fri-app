// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { NavigationExperimental, View, BackAndroid, AppState, Platform } from 'react-native';
import { connect } from 'react-redux';

import Tabs from 'tabs';
import EventCardScene from 'scenes/EventCardScene';
import CompanyCardScene from 'scenes/CompanyCardScene';
import LabCardScene from 'scenes/LabCardScene';
import StudyProgramCardScene from 'scenes/StudyProgramCardScene';
import { pushRouteAction, popRouteAction, changeAppStateAction } from 'actions/navigationActions';
import fetchAction from 'actions/fetchActions';

import type { NavigationState } from 'NavigationTypeDefinition';
import type { ReducerType } from 'reducers';

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
    if (!this.props.user) this.props.createUser();

    BackAndroid.addEventListener('hardwareBackPress', () => {
      // If false is returned the app will exit
      if (this.props.navigationState.index === 0) return false;

      return this.props.navigation.popRoute();
    });

    AppState.addEventListener('change', (state) => {
      if (state === 'inactive' || state === 'active') {
        this.props.changeAppState(state);
      }
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
    AppState.removeEventListener('change');
  }

  renderScene(sceneProps) {
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
    pushRoute: (route: RouteType) => void,
    popRoute: () => void,
  },
  createUser: () => void,
  changeAppState: (state: string) => void,
  user: ?UserType,
};

const createUserMutation = `
mutation CreateUserMutation($os: String!, $version: String!) {
  user: createUser(os: $os, version: $version) {
    id
    color
  }
}
`;

const variables = {
  os: Platform.OS,
  version: Platform.Version,
};

const select = ({ navigationStore, dataStore }: ReducerType) => ({
  navigationState: navigationStore.routes,
  user: dataStore.user,
});

const actions = (dispatch: Dispatch) => ({
  navigation: {
    pushRoute: (route) => dispatch(pushRouteAction(route)),
    popRoute: () => dispatch(popRouteAction()),
  },
  createUser: () => dispatch(fetchAction({ query: createUserMutation, variables }, 'CREATE_USER')),
  changeAppState: (state) => dispatch(changeAppStateAction(state)),
});

export default connect(select, actions)(App);
