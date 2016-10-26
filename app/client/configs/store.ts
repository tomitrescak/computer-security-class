import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

// import the root reducer
import initReducer from './reducers';

// apollo
import client from './apollo';

// create an object for the default data
let store: Cs.IStore;

export default function (defaultState: any = {}, force = false) {

  if (force || !store) {
    // middlewares

    const middleware = [
      reduxThunk,
      client.middleware(),
      routerMiddleware(browserHistory)
    ];

    // redux tool

    const enhancers = compose(
      applyMiddleware(...middleware),
      window['devToolsExtension'] ? window['devToolsExtension']() : f => f
    );

    // initialise store

    store = createStore<Cs.IState>(initReducer(), defaultState, enhancers);
  }
  return store;
}

// hot reload
if (module['hot']) {
  module['hot'].accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}
