// @flow
const updateLocationAction = (nextLocation: UserLocationType): ActionType => ({
  type: 'UPDATE_LOCATION',
  nextLocation,
});

export { updateLocationAction };
