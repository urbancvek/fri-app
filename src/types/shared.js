// @flow
type latitude = number;
type longitude = number;

declare type UserLocationType = {
  coordinates: [latitude, longitude],
  course: number,
  floor: number,
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

declare type PersonType = {
  firstName: string,
  lastName: string,
  image: {
    url: string,
  },
};

declare type EventType = {
  title: string,
  location: string,
  accentColor: string,
  description?: Array<string>,
  personnel?: Array<PersonType>,
  content?: string,
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
  personnel?: Array<PersonType>,
  content?: string,
};

declare type LabType = {
  title: string,
  location: string,
  image: {
    url: string,
  },
  personnel?: Array<PersonType>,
  content?: string,
};

declare type StudyProgramType = {
  title: string,
  subtitle: string,
  gradTitle: string,
  content?: string,
};

declare type UserType = {
  id: string,
  color: 'string',
};
