// @flow
type State = {
  currentLocation: UserLocationType,
};

const initialState: State = {
  currentLocation: {
    coordinates: [46.050, 14.469],
    course: 0,
  },
};

const locationReducer = (state: State = initialState, action: ActionType): State => {
  switch (action.type) {
    case 'UPDATE_LOCATION': {
      return {
        ...state,
        currentLocation: action.nextLocation,
      };
    }

    default: return state;
  }
};

export default locationReducer;
export type { State as LocationStore };
