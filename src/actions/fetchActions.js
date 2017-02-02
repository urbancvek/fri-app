// @flow
import axioql, { setQLEndpoint } from 'axioql';

setQLEndpoint('https://fri.shopster.io/graphql');

type GraphQLDataType = {
  query: string,
  variables?: Object,
};

const fetch = (graphQLData: GraphQLDataType, type: string) => async (dispatch: Dispatch) => {
  dispatch({ type: `${type}_REQUEST` });

  try {
    const response = await axioql(graphQLData);

    dispatch({ type: `${type}_RESPONSE`, payload: response.data.data });
  } catch (error) {
    console.error(error);
  }
};

export default fetch;
