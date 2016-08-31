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

    interface IApolloMutation {
      variables?: any;
      optimisticResponse?: any;
      updateQueries?: any;
    }

    interface IMutationProps<T, U> {
      mutate: (param: IApolloMutation) => Promise<U>;
      ownProps: T;
    }

    interface IQueryProps<T, U> {
      ownProps: T;
      data: U;
    }

    interface IComponentMutations<T> {
      mutations: T;
    }
  }
}

const networkInterface = createNetworkInterface('http://localhost:3002/graphql'); // /graphql
// const networkInterface = createNetworkInterface('/graphql');

// middlewares 123

networkInterface.use([{
  applyMiddleware(req: any, next: any) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const token = localStorage.getItem('jwtToken');
    if (token) {
      req.options.headers.authorization = token;
    }
    next();
  }
}]);

// afterwares

networkInterface.useAfter([{
  applyAfterware(response: any, next: any) {
    if (response.status === 401) {
      localStorage.removeItem('jwtToken');
      RouterUtils.go('/sessionEnded1');
    }
    if (response.status === 200) {
      localStorage.removeItem('jwtToken');
      RouterUtils.go('/');
    }
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (result: any) => {
    return result._id;
  }
});

export default client;
