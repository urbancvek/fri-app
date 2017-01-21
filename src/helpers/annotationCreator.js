// @flow
const createLocationAnnotation = (location: UserLocationType): AnnotationType => ({
  coordinates: location.coordinates,
  type: 'point',
  id: 'locationID',
  annotationImage: {
    source: {
      uri: 'user_location_circle',
    },
    height: 30,
    width: 30,
  },
});

export { createLocationAnnotation };
