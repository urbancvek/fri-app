// @flow
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';

import combinedReducers from 'reducers';

let persistedStore;

// Create middlewares
const middlewares = [thunk];

// Logs actions to console if in development
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    timestamp: false,
    collapsed: true,
    diff: true,
  });
  middlewares.push(logger);
}

// Called from <Root /> when app is initialized
const configureStore = (onComplete: () => void) => {
  // Create store and with middleware and autoRehydrate as enhancers
  const store = createStore(
    combinedReducers,
    compose(
      autoRehydrate(),
      applyMiddleware(...middlewares)
    )
  );

  const config = {
    storage: AsyncStorage,
    blacklist: ['navigationStore'],
  };

  // When completed with persisting the store call onComplete callback
  persistedStore = persistStore(store, config, () => onComplete());

  // Declare the module to silence the flow error
  declare var module: { hot: { accept(callback: () => void): void } };

  if (module.hot) {
    module.hot.accept(() => {
      const nextReducer = require('reducers').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

const purgeStore = () => {
  persistedStore.purge();
};

export { configureStore, purgeStore };
