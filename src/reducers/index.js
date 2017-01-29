// @flow
import { combineReducers } from 'redux';

import navigationReducer from 'reducers/navigationReducer';

import type { NavigationStore } from 'reducers/navigationReducer';

const combinedReducers = combineReducers({
  navigationStore: navigationReducer,
});

type ReducerType = {
  navigationStore: NavigationStore,
};

export default combinedReducers;
export type { ReducerType };
