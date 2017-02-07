// @flow
const createLocationAnnotation = (location: UserLocationType, indoorLocation: boolean): AnnotationType => ({
  coordinates: location.coordinates,
  type: 'point',
  id: 'locationID',
  annotationImage: {
    source: {
      uri: indoorLocation ? 'user_location_circle' : 'empty',
    },
    height: 23,
    width: 23,
  },
});

const createClassroomAnnotation = ({ id, coordinates }): AnnotationType => ({
  id,
  type: 'point',
  coordinates,
  annotationImage: {
    source: {
      uri: id.toLowerCase(),
    },
    height: 54,
    width: 88,
  },
});

export { createLocationAnnotation, createClassroomAnnotation };
