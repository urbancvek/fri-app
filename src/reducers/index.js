// @flow
import { combineReducers } from 'redux';

import navigationReducer from 'reducers/navigationReducer';
import dataReducer from 'reducers/dataReducer';
import locationReducer from 'reducers/locationReducer';

import type { NavigationStore } from 'reducers/navigationReducer';
import type { DataStore } from 'reducers/dataReducer';
import type { LocationStore } from 'reducers/locationReducer';

const combinedReducers = combineReducers({
  navigationStore: navigationReducer,
  dataStore: dataReducer,
  locationStore: locationReducer,
});

type ReducerType = {
  navigationStore: NavigationStore,
  dataStore: DataStore,
  locationStore: LocationStore,
};

export default combinedReducers;
export type { ReducerType };
