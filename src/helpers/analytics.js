// @flow
import axioql, { setQLEndpoint } from 'axioql';

setQLEndpoint('https://fri.shopster.io/graphql');

import type { ReducerType } from 'reducers';

const updateUserLocationMutation = `
mutation UpdateUserLocation($userId: ID!, $location: [Float]) {
  updateUserLocation(userId: $userId, location: $location)
}
`;

const logChangeTabMutation = `
mutation LogChangeTab($userId: ID!, $index: Int!) {
  logChangeTab(userId: $userId, index: $index)
}
`;

const logPushRouteMutation = `
mutation LogPushRoute($userId: ID!, $key: String!, $title: String!) {
  logPushRoute(userId: $userId, key: $key, title: $title)
}
`;

const logPopRouteMutation = `
mutation LogPopRoute($userId: ID!) {
  logPopRoute(userId: $userId)
}
`;

const analytics = store => next => action => {
  const state: ReducerType = store.getState();
  const user = state.dataStore.user;

  switch (action.type) {
    case 'UPDATE_LOCATION': {
      const variables = {
        userId: user.id,
        location: action.nextLocation.coordinates,
      };

      axioql({ query: updateUserLocationMutation, variables });
      break;
    }

    case 'CHANGE_TAB': {
      const variables = {
        userId: user.id,
        index: action.index,
      };

      axioql({ query: logChangeTabMutation, variables });
      break;
    }

    case 'PUSH_ROUTE': {
      const payloads = Object.keys(action.route)
        .filter(key => key !== 'key')
        .map(key => action.route[key]);

      const title = payloads[0] && payloads[0].title;

      if (!title) return;

      const variables = {
        userId: user.id,
        key: action.route.key,
        title,
      };

      axioql({ query: logPushRouteMutation, variables });
      break;
    }

    case 'POP_ROUTE': {
      const variables = {
        userId: user.id,
      };

      axioql({ query: logPopRouteMutation, variables });
      break;
    }
  }

  return next(action);
};

export default analytics;
