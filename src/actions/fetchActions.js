// @flow
import axioql, { setQLEndpoint } from 'axioql';

setQLEndpoint('https://fri.shopster.io/graphql');

type GraphQLDataType = {
  query: string,
  variables?: Object,
};

const fetchAction = (graphQLData: GraphQLDataType, type: string) => async (dispatch: Dispatch) => {
  dispatch({ type: `${type}_REQUEST` });

  try {
    const response = await axioql(graphQLData);

    dispatch({ type: `${type}_RESPONSE`, payload: response.data.data, graphql: true });
  } catch (error) {
    if (error.message === 'Network Error') console.log('Network error!');
    else console.error(error.message);
  }
};

export default fetchAction;
