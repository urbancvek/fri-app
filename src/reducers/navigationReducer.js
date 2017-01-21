// @flow
import type { NavigationState } from 'NavigationTypeDefinition';

type TabsState = {
  currentTab: number,
  availableTabs: Array<string>,
};

type State = {
  tabs: TabsState,
  routes: NavigationState,
};

const initialState: State = {
  tabs: {
    currentTab: 0,
    availableTabs: ['HOME_TAB', 'MAP_TAB'],
  },
  routes: {
    index: 0,
    routes: [{ key: 'TABS' }],
  },
};

const navigationReducer = (state: State = initialState, action: ActionType) => {
  switch (action.type) {
    case 'POP_ROUTE':
    case 'PUSH_ROUTE': {
      return {
        ...state,
        routes: routesReducer(state.routes, action),
      };
    }

    case 'CHANGE_TAB': {
      return {
        ...state,
        tabs: tabsReducer(state.tabs, action),
      };
    }

    default: return state;
  }
};

const routesReducer = (state: NavigationState, action: ActionType) => {
  switch (action.type) {
    case 'PUSH_ROUTE': {
      if (state.routes[state.index].key === action.route.key) return state;

      return {
        index: state.index + 1,
        routes: [...state.routes, action.route],
      };
    }

    case 'POP_ROUTE': {
      if (state.index === 0 || state.routes.length === 1) return state;

      return {
        index: state.index - 1,
        routes: state.routes.slice(0, state.routes.length - 1),
      };
    }

    default: return state;
  }
};

const tabsReducer = (state: TabsState, action: ActionType) => {
  switch (action.type) {
    case 'CHANGE_TAB': {
      return {
        ...state,
        currentTab: action.index,
      };
    }

    default: return state;
  }
};

export default navigationReducer;
