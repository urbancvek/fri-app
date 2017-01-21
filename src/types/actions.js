// @flow
import type { NavigationRoute } from 'NavigationTypeDefinition';

declare type ActionType =
  { type: 'DEFAULT' } |

  { type: 'PUSH_ROUTE', route: NavigationRoute } |
  { type: 'POP_ROUTE' } |
  { type: 'JUMP_TO_ROUTE', route: NavigationRoute } |
  { type: 'CHANGE_TAB', index: number }
;
