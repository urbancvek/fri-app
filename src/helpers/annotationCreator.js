// @flow
import { Platform } from 'react-native';

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

const createClassroomAnnotation = ({ id, coordinates }): AnnotationType => ({
  id,
  type: 'point',
  coordinates,
  annotationImage: {
    source: {
      uri: Platform.select({ ios: id, android: id.toLowerCase() }),
    },
    height: 54,
    width: 88,
  },
});

export { createLocationAnnotation, createClassroomAnnotation };
