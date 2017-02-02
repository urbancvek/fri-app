// @flow
type State = {
  user: ?UserType,
};

const initialState: State = {
  user: null,
};

const dataReducer = (state: State = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER_RESPONSE': {
      return {
        ...state,
        user: action.payload.user,
      };
    }

    default: return state;
  }
};

export default dataReducer;
export type { State as DataStore };
