// @flow
import merge from 'deepmerge';

type State = {
  user: ?UserType,
};

const initialState: State = {
  user: null,
  companies: [],
  labs: [],
  data: {
    aboutFRI: '<div />',
    enroll: '<div />',
    aboutGaraza: '<div />',
    aboutShopster: '<div />',
    ourWorkShopster: '<div />',
  },
  studyPrograms: {
    dodiplomski: [],
    magistrski: [],
    doktorski: [],
  },
  events: {
    first: [],
    second: [],
    third: [],
  },
};

const newArrayAlways = (destinationArray: [], sourceArray: []) => sourceArray;

const dataReducer = (state: State = initialState, action) => {
  if (action.type === 'GRAPHQL_RESPONSE') {
    Object.keys(action.payload).forEach(key => {
      delete action.payload[key].__typename;
    });

    return merge(state, action.payload, { arrayMerge: newArrayAlways });
  }

  return state;
};

export default dataReducer;
export type { State as DataStore };
