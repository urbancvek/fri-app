// @flow
declare type RouteType = { key: string };

declare type ActionType =
  { type: 'DEFAULT' } |

  { type: 'PUSH_ROUTE', route: RouteType } |
  { type: 'POP_ROUTE' } |
  { type: 'JUMP_TO_ROUTE', route: RouteType } |
  { type: 'CHANGE_TAB', index: number }
;
