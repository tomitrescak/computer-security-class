declare namespace express {
  export interface Request {}
  export interface Response {}
}

declare module 'express' {
  let express: any;
  export = express;
}

declare namespace hapi {
  export interface Request {}
  export interface Server {}
}

declare module 'hapi' {
  let server: any;
  export = server;
}

declare namespace koa {
  export interface Request {}
  export interface Server {}
}

declare module 'koa' {
  let server: any;
  export = server;
}

declare module 'body-parser' {
  var a: any;
  export = a;
}

declare module 'cors' {
  var a: any;
  export = a;
}

declare module 'jsonwebtoken' {
  var a: any;
  export = a;
}

declare module 'connect-history-api-fallback' {
  var history: any;
  export = history;
}
