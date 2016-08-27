import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { RouterUtils } from '../helpers/helpers_client';

declare global {
  namespace Apollo {
    interface IGraphqlQuery {
      [name: string]: {
        query: any,
        forceFetch?: boolean,
        pollInterval?: number;
        variables?: Object
      };
    }

    interface IGraphQlProps<T> {
      state: Cs.IState;
      ownProps: T;
    }

    interface IComponentMutations<T> {
      mutations: T;
    }
  }
}

const networkInterface = createNetworkInterface('http://localhost:3002/graphql'); // /graphql
// const networkInterface = createNetworkInterface('/graphql');

// middlewares

networkInterface.use([{
  applyMiddleware(req: any, next: any) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers.authorization = localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : null;
    next();
  }
}]);

// afterwares

networkInterface.useAfter([{
  applyAfterware(response: any, next: any) {
    if (response.status === 401) {
      localStorage.setItem('jwtToken', null);
      RouterUtils.go('/sessionEnded1');
    }
    if (response.status === 200) {
      localStorage.setItem('jwtToken', null);
      RouterUtils.go('/');
    }
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
});

export default client;
