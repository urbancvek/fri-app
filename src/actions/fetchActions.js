// @flow
import axioql, { setQLEndpoint } from 'axioql';

setQLEndpoint('https://fri.shopster.io/graphql');

type GraphQLDataType = {
  query: string,
  variables?: Object,
};

const fetchAction = (graphQLData: GraphQLDataType) => async (dispatch: Dispatch) => {
  dispatch({ type: 'GRAPHQL_REQUEST' });

  try {
    const response = await axioql(graphQLData);

    dispatch({ type: 'GRAPHQL_RESPONSE', payload: response.data.data });
  } catch (error) {
    if (error.message === 'Network Error') console.log('Network error!');
    else console.error(error);
  }
};

export default fetchAction;
