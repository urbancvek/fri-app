// @flow
type latitude = number;
type longitude = number;

declare type UserLocationType = {
  coordinates: [latitude, longitude],
  course: number,
};

declare type AnnotationType = {
  coordinates: [number, number],
  title?: string,
  type: 'point',
  id: string,
  leftCalloutAccessory?: {
    source: {
      uri: string,
    },
    height: number,
    width: number,
  },
  annotationImage?: {
    source: {
      uri: string,
    },
    height: number,
    width: number,
  },
};

declare type EventType = {
  type: 'EVENT',
  title: string,
  location: string,
  accentColor: string,
  description?: Array<string>,
};

declare type CompanyType = {
  title: string,
  accentColor: string,
  location: string,
  image: {
    url: string,
    width: number,
    height: number,
  },
};

declare type LabType = {
  type: 'LAB',
  title: string,
};
