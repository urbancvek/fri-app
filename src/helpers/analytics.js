// @flow
import axioql from 'axioql';

import type { ReducerType } from 'reducers';

const updateUserLocationMutation = `mutation($userId: ID!, $location: [Float]) {
  updateUserLocation(userId: $userId, location: $location)
}`;

const analytics = store => next => action => {
  switch (action.type) {
    case 'UPDATE_LOCATION': {
      const state: ReducerType = store.getState();
      const user = state.dataStore.user;

      const variables = {
        location: action.nextLocation.coordinates,
        userId: user.id,
      };

      axioql({ query: updateUserLocationMutation, variables });
    }
  }

  return next(action);
};

export default analytics;
