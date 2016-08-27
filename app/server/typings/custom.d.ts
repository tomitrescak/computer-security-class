declare module 'graphql-tools' {
  interface IExecutableSchemaDefinition {
    typeDefs: any[];
    resolvers: any[];
    allowUndefinedInResolve?: boolean;
  }
  export function makeExecutableSchema(definition: IExecutableSchemaDefinition): any;
}

declare module 'meteor-random' {
  export function id(length?: number): string;
  export function secret(length?: number): string;
  export function fraction(): number;
  export function choice<T>(array: T[]): T;
}

declare module 'apollo-server' {
  export var apolloServer: any;
  export function apolloExpress(...params: any[]): any;
  export function graphiqlExpress(...params: any[]): any;
}

declare module 'apollo-module-date' {
  var schema: any;
  export default schema;
}

declare module 'meteor-sha256' {
  function sha256 (text: string): string;
  export = sha256;
}
