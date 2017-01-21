// @flow
import { combineReducers } from 'redux';

import navigationReducer from 'reducers/navigationReducer';

const combinedReducers = combineReducers({
  navigationStore: navigationReducer,
});

export default combinedReducers;
