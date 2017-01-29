// @flow
type TabsState = {
  currentTab: number,
  availableTabs: Array<{ key: string, title: string }>,
};

type RoutesState = {
  index: number,
  routes: Array<RouteType>,
};

type State = {
  tabs: TabsState,
  routes: RoutesState,
};

const initialState: State = {
  tabs: {
    currentTab: 0,
    availableTabs: [
      { key: 'HOME_TAB', title: 'Urnik' },
      { key: 'STUDY_TAB', title: 'Študij' },
      { key: 'MAP_TAB', title: 'Načrt' },
      { key: 'INFO_TAB', title: 'Info' },
      { key: 'SHOPSTER_TAB', title: 'Shopster' },
    ],
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

const routesReducer = (state: RoutesState, action: ActionType) => {
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
export type { State as NavigationStore };
