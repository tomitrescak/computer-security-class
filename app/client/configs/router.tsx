import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { getRootNode } from '../helpers/routing_helpers';

// apollo

import { ApolloProvider } from 'react-apollo';
import apolloClient from './apollo';

// init redbox

const consoleErrorReporter = ({ error }: any) => {
  console.error(error);
  console.error(error.stack);
  return <div><pre>{error}</pre></div>;
};

// Hot reload
// import { AppContainer as HotLoaderAppContainer } from 'react-hot-loader';
import AppRoutes from '../modules/routes';

export default function (inject: Function, {Store}: Cs.IContext) {
  const history = syncHistoryWithStore(browserHistory, Store);

  const renderApp = (CurrentAppRoutes: any) => {
    ReactDOM.render(
        <ApolloProvider store={Store} client={apolloClient}>
          <CurrentAppRoutes history={history} injectDeps={inject} />
        </ApolloProvider>,
      getRootNode('react-root')
    );
  };

  renderApp(AppRoutes);


  // <HotLoaderAppContainer errorReporter={consoleErrorReporter}>
  //   <ApolloProvider store={Store} client={apolloClient}>
  //     <CurrentAppRoutes history={history} injectDeps={inject} />
  //   </ApolloProvider>
  // </HotLoaderAppContainer>,
  //
  // if (module.hot) {
  //   // /**
  //   //  * Warning from React Router, caused by react-hot-loader.
  //   //  * The warning can be safely ignored, so filter it from the console.
  //   //  * Otherwise you'll see it every time something changes.
  //   //  * See https://github.com/gaearon/react-hot-loader/issues/298
  //   //  */
  //   // const orgError = console.error; // eslint-disable-line no-console
  //   // console.error = (message) => { // eslint-disable-line no-console
  //   //   if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
  //   //     // Log the error as normally
  //   //     orgError.apply(console, [message]);
  //   //   }
  //   // };
  //
  //   module.hot.accept('../modules/routes.jsx', () => {
  //     const NextAppRoutes = require('../modules/routes.jsx').default;
  //     renderApp(NextAppRoutes);
  //   });
  // }
};
