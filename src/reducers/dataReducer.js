// @flow
type State = {
  user: ?UserType,
};

const initialState: State = {
  user: null,
  companies: [],
  labs: [],
  data: {
    aboutFRIContent: '',
  },
};

const dataReducer = (state: State = initialState, action) => {
  if (action.graphql) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

export default dataReducer;
export type { State as DataStore };
