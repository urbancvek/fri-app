// @flow
import axioql, { setQLEndpoint } from 'axioql';
import Raven from 'raven-js';

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
    Raven.captureException(error);
  }
};

export default fetchAction;
