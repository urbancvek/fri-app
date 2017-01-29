// @flow

// Push new route to the stack
const pushRouteAction = (route: RouteType): ActionType => ({
  type: 'PUSH_ROUTE',
  route,
});

// Pops a route from the stack
const popRouteAction = () => ({
  type: 'POP_ROUTE',
});

// Changes the tab
const changeTabAction = (index: number): ActionType => ({
  type: 'CHANGE_TAB',
  index,
});

export { pushRouteAction, popRouteAction, changeTabAction };
