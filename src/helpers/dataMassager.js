// @flow
const convertToFlatArray = (object: { [key: string]: Array<any> }) => {
  const flatArray = [];

  Object.keys(object).sort().forEach(key => {
    flatArray.push({ section: true, title: key });
    flatArray.push(...object[key]);
  });

  return flatArray;
};

const convertEventsToSections = (array: Array<EventType>) => {
  const object = array.reduce((whole, event) => {
    if (whole[event.startTime]) whole[event.startTime].push(event);
    else whole[event.startTime] = [event];

    return whole;
  }, {});

  return object;
};

export { convertToFlatArray, convertEventsToSections };
