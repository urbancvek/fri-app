// @flow
const convertToFlatArray = (object: { [key: string]: Array<any> }) => {
  const flatArray = [];

  Object.keys(object).forEach(key => {
    flatArray.push({ section: true, title: key });
    flatArray.push(...object[key]);
  });

  return flatArray;
};

export { convertToFlatArray };
