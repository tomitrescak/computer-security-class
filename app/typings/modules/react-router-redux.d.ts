declare module 'react-router-redux' {
  export function syncHistoryWithStore(history: any, store: any): any;
  export function push(route: string): void;
  export var routerReducer: any;
  export var routerMiddleware: any;
}