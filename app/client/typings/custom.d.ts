///////////////////////////////////////////////////////////////
// Node.js                                                   //
///////////////////////////////////////////////////////////////

declare var global: any;
declare var module: any;
declare function require(mod: string): any;
declare var process: any;

// ///////////////////////////////////////////////////////////////
// // react-router                                  //
// ///////////////////////////////////////////////////////////////
//
// declare module 'react-router' {
//   export var browserHistory: any;
// }

///////////////////////////////////////////////////////////////
// react-dom                                                 //
///////////////////////////////////////////////////////////////

declare module 'react-dom' {
  export function render(...params: any[]): any;
}

///////////////////////////////////////////////////////////////
// react-router-redux                                        //
///////////////////////////////////////////////////////////////

declare module 'react-router-redux' {
  export function syncHistoryWithStore(history: any, store: any): any;
  export function push(route: string): void;
  export var routerReducer: any;
  export var routerMiddleware: any;
}


///////////////////////////////////////////////////////////////
// react-mounter                                             //
///////////////////////////////////////////////////////////////

declare module 'react-mounter' {
  export var mount: any;
  export var withOptions: any;
}

///////////////////////////////////////////////////////////////
// mantra                                                    //
///////////////////////////////////////////////////////////////

declare module 'mantra-core' {
  interface IKomposer {
    (params: Object, onData: Function): Function;
  }

  interface IKomposerData<T> {
    (error?: Object, data?: T): void;
  }

  interface IInjectDeps {
    (...deps: any[]): IInjectDeps;
  }

  interface IDepsMapper {
    (...deps: any[]): void;
  }

  export var injectDeps: IInjectDeps;
  export function useDeps(depsMapper?: IDepsMapper): any;
  export function createApp(context: any): any;

  export function compose(komposer: IKomposer, loadingComponent?: any, bim?: any, opts?: { pure: Boolean }): any;
  export function composeWithTracker(komposer: IKomposer, loadingComponent?: any, bim?: any, opts?: { pure: Boolean }): any;
  export function composeWithPromise(): any;
  export function composeWithObservable(): any;
  export function composeAll<V>(...composeFunctions: Function[]):
    (component: any, loadingComponent?: any) => () => React.Component<V, {}>;
}

///////////////////////////////////////////////////////////////
// storybook                                                 //
///////////////////////////////////////////////////////////////

declare module '@kadira/storybook' {
  export var storiesOf: any;
  export var action: any;
}

///////////////////////////////////////////////////////////////
// react-hot-loader                                          //
///////////////////////////////////////////////////////////////

declare module 'react-hot-loader' {
  export var AppContainer: any;
}

///////////////////////////////////////////////////////////////
// redbox-react                                              //
///////////////////////////////////////////////////////////////

declare module 'redbox-react' {
  let Alert: any;
  export default Alert;
}

///////////////////////////////////////////////////////////////
// apollo                                                    //
///////////////////////////////////////////////////////////////

declare module 'meteor/apollo' {
  interface ServerProperties {
    schema: any;
    formatError?: Function;
    graphiql?: Boolean;
    pretty?: Boolean;
    validationRules?: Array<any>;
    context?: any;
    rootValue?: any;

    // Apollo options
    resolvers?: Object;
    connectors?: Object;
    mocks?: Object;
    printErrors?: Boolean;
    allowUndefinedInResolve?: Boolean;
  }

  interface ClientProperties {
    path: string;
    options: any;
    useMeteorAccounts: boolean;
  }

  export function createApolloServer(options?: ServerProperties): void;
  export function meteorClientConfig(options?: ClientProperties): void;
}

declare module 'apollo-client' {
  export var Document: any;
  export var GraphQLResult: any;
  export var SelectionSet: any;
  export var GraphQLError: any;
  export var ApolloClient: any;
  export var createNetworkInterface: any;
  export default ApolloClient;
}

declare var gql: any;

declare module 'react-apollo' {
  export var ApolloProvider: any;
  export var connect: any;
}

declare module 'apollo-client/gql' {
  export var registerGqlTag: any;
}

declare module 'graphql-tools' {
  export var apolloServer: any;
}

declare module 'express' {
  let express: any;
  export default express;
}

declare module 'http-proxy-middleware' {
  let proxyMiddleware: any;
  export default proxyMiddleware;
}

declare module 'redux-thunk' {
  let thunk: any;
  export default thunk;
}

declare module 'redux-logger' {
  let logger: any;
  export default logger;
}

///////////////////////////////////////////////////////////////
// jss                                                       //
///////////////////////////////////////////////////////////////

declare module 'jss' {
  interface JssStylesheet {
    attach(): { classes: any };
  }
  interface IJss {
    use(plugin: any): void;
    createStyleSheet(sheet: any): JssStylesheet;

  }
  let jss: IJss;
  export default jss;
}

declare module 'jss-nested' {
  export default function(): any;
}

declare module 'jss-vendor-prefixer' {
  export default function(): any;
}

///////////////////////////////////////////////////////////////
// meteor packages                                           //
///////////////////////////////////////////////////////////////

declare module 'meteor/didstopia:admzip' {
  export var extractZip: any;
}

///////////////////////////////////////////////////////////////
// react-s-alert                                             //
///////////////////////////////////////////////////////////////


declare module 'react-s-alert' {
  export default class SAlertStatic extends __React.Component<{}, {}> {
    static success(message: string, options?: Object): void;
    static info(message: string, options?: Object): void;
    static error(message: string, options?: Object): void;
    static config(config: Object): void;
  }

  // let Alert: SAlertStatic;
  // export default Alert;
}


///////////////////////////////////////////////////////////////
// i18n-client                                               //
///////////////////////////////////////////////////////////////

interface I18n {
  languages: Object;
  currentLanguage: string;
  add(language: string, strings: Object): void;
  initTranslator(prefix: string): void;
  translate(key: string, args?: any): string;
}

declare module 'i18n-client' {
  export var i18n: I18n;
  export function __(key: string, args?: any): string;
}

///////////////////////////////////////////////////////////////
// marked                                                    //
///////////////////////////////////////////////////////////////

declare module 'marked' {
  export var marked: Function;
  export default marked;
}

///////////////////////////////////////////////////////////////
// moment                                                    //
///////////////////////////////////////////////////////////////

declare module 'moment' {
  export var moment: Function;
  export default moment;
}

///////////////////////////////////////////////////////////////
// pickadate                                                 //
///////////////////////////////////////////////////////////////

declare interface JQuery {
  pickadate(props: any): void;
}

///////////////////////////////////////////////////////////////
// semantic ui                                               //
///////////////////////////////////////////////////////////////

interface JQuery {
  form(formDefinition: any, options: any): any;
  dropdown(...params: any[]): void;
  transition(name: string, duration: number, callback?: () => void): any;
  sticky(options: any): any;
  search(options: Object): any;
  modal(text: any): JQuery;
  tab(): any;
  checkbox(): any;
  popup(): any;
  sidebar(...params: any[]): any;
}

interface JQueryStatic {
  semanticUiGrowl(text: string, params?: Object): any;
}

///////////////////////////////////////////////////////////////
// Sweet alert                                               //
///////////////////////////////////////////////////////////////

declare module 'sweetalert' {
  export default function swal(...any: any[]): void;
}

declare module 'sweetalert2' {
  export default function swal(...any: any[]): any;
  export default function sweetalert(...any: any[]): any;
}

///////////////////////////////////////////////////////////////
// jsx-control-statements                                    //
///////////////////////////////////////////////////////////////

declare function If(condition: any): any;
declare function For(each: string, index: string, of: any): any;
declare var Else: any;
declare function Choose(): any;
declare function When(condition: any): any;
declare function Otherwise(): any;

///////////////////////////////////////////////////////////////
// eventobject                                               //
///////////////////////////////////////////////////////////////
declare interface IEventObject {
  on(listener: Function, executeImmediatelly?: boolean): void;
  off(listener: Function): void;
  attachListener(listener: Function): void;
  detachListener(listener: Function): void;
  reset(): void;
  emit(...args: any[]): void;
}

declare module 'eventobject' {
  export default class Event {
    on(listener: Function, executeImmediatelly?: boolean): void;
    off(listener: Function): void;
    attachListener(listener: Function): void;
    detachListener(listener: Function): void;
    reset(): void;
    emit(...args: any[]): void;
  }
}

///////////////////////////////////////////////////////////////
// tomi:apollo-mantra                                        //
///////////////////////////////////////////////////////////////

declare interface IApolloState {
  queries: Object;
  mutations: Object;
}

declare interface IApolloDefinition {
  schema: string;
  queries?: Object;
  resolvers?: Object;
  mutations?: Object;
  queryText?: string;
  mutationText?: string;
}

declare module 'graphql-tag' {
  let gql: any;
  export default gql;
}

declare module 'meteor/tomi:apollo-mantra' {
  export function processSchema(definition: IApolloDefinition[]): void;
  export function schemas(): any;
  export function resolvers(): any;
  export function ioSchema(type: string): void;
  export function modificationSchema(): string;
}

declare module 'apollo-mantra/server' {
  export function processSchema(definition: IApolloDefinition[]): void;
  export function schemas(): any;
  export function resolvers(): any;
  export function ioSchema(type: string): void;
  export function modificationSchema(): string;
}

declare module 'apollo-mantra' {
  interface IConnectFunctions {
    initContainer?: Function;
    mapStateToProps?: Function;
    mapDispatchToProps?: Function;
    mapQueriesToProps?: Function;
    mapMutationsToProps?: Function;
  }

  interface IQuery {
    query: string;
    variables?: Object;
    optimisticCallback?: (dispatch: Function, state: () => any) => void;
    thenCallback?: (data: any, dispatch: Function, state: () => any) => void;
    errorCallback?: (errors: any, dispatch: Function, state: () => any) => void;
    catchCallback?: (error: any, dispatch: Function, state: () => any) => void;
    finalCallback?: (dispatch: Function, state: () => any) => void;
  }

  interface IResult<T> {
    type: string;
    result: {
      data: T
    }
  }

  interface IMutationResult<T> extends IResult<T> {
    mutationId: string;
  }

  interface IQueryResult<T> extends IResult<T> {
    queryId: string;
    requestId: number;
  }

  interface IOptions {
    loadingComponent?: any;
    apolloClient?: any;
    store: any;
  }

  export function query(query: IQuery): void;
  export function mutation(query: IQuery): void;
  export function createApp(context: any, options: IOptions): any;
  export function composeAll<V>(...composeFunctions: Function[]):
    (component: any, loadingComponent?: any) => () => React.Component<V, {}>;
  export function compose<T>(funcs: IConnectFunctions): (component: any) => React.StatelessComponent<T>;
  export function connect<T>(funcs: IConnectFunctions): (component: any) => React.StatelessComponent<T>;
  export function loadingContainer(component: any, keys?: string[]): any;
  export function loaderContainer(component: any, mapProps?: (context: Cs.IContext, ownProps: any) => void): any;
  export function loadingContainer(component: any, loading?: any, keys?: string[]): any;
  export function copyQuery(state: Object, stateKey: string, queryResult: Object[], queryKey?: string, overwrite?: boolean): Object;
  export function isQuery(action: any, queryName: string): boolean;
  export function getQuery<T>(action: any): string;
  export function isMutation(action: any, queryName: string): boolean;
  export function getMutation<T>(action: any): string;
  export function queriesFinished(state: IApolloState): boolean;
}

///////////////////////////////////////////////////////////////
// apollo-mantra                                             //
///////////////////////////////////////////////////////////////

declare interface IReduxAction {
  type: string;
}

///////////////////////////////////////////////////////////////
// react-addons-update                                       //
///////////////////////////////////////////////////////////////

declare module 'react-addons-update' {
  export default function update(obj: Object, query: Object): Object;
}

///////////////////////////////////////////////////////////////
// java2js                                                   //
///////////////////////////////////////////////////////////////

declare module java2jscompiler {
  interface Map<T> {
    [index: string]: T;
  }

  interface IFile {
    name: string;
    source: string;
  }

  interface ICompiledFile {
    version?: number;
    name?: string;
    source?: string;
    result?: string;
  }

  interface IMessage {
    file?: string;
    line: number;
    column: number;
    message: string;
  }

  interface IDoubleCompilationResult {
    ts?: Map<ICompiledFile>;
    js?: Map<ICompiledFile>;
    errors: IMessage[];
    warnings: IMessage[];
  }

  interface IAsyncCompilationResult {
    files: Map<ICompiledFile>;
    warnings: Map<IMessage[]>;
    errors: Map<IMessage[]>;
  }
}

declare var java2js: {
  initService(files: java2jscompiler.IFile[]): void;
  compile(file: java2jscompiler.IFile, parseOnly?: boolean): java2jscompiler.IDoubleCompilationResult
  compileAsync(files: java2jscompiler.IFile[], cb: (result: java2jscompiler.IAsyncCompilationResult) => void, timeout?: number): void;
};

///////////////////////////////////////////////////////////////
// ace                                                       //
///////////////////////////////////////////////////////////////

declare module 'brace' {
  let exp: any;
  export default exp;
}

declare module 'react-ace' {
  let exp: any;
  export default exp;
}

///////////////////////////////////////////////////////////////
// Kinetic.JS                                                //
///////////////////////////////////////////////////////////////

declare var Kinetic: any;


declare module 'react-functional' {
  interface ILifeCycle<T> {
    componentWillMount?(props: T): any;
    componentDidMount?(props: T, refs: any): any;
    componentWillReceiveProps?(props: T, nextProps: T, refs: any): any
    shouldComponentUpdate?(props: T, nextProps: T, refs: any): any
    componentWillUpdate?(props: T, nextProps: T, refs: any): any
    componentDidUpdate?(props: T, prevProps: T, refs: any): any
    componentWillUnmount?(props: T, refs: any): any
  }
  export default function composer<T>(component: __React.StatelessComponent<any>, lifecycle: ILifeCycle<T>): void;
}

///////////////////////////////////////////////////////////////
// meteor-random                                             //
///////////////////////////////////////////////////////////////

declare module 'meteor-random' {
  export function id(length?: number): string;
  export function secret(length?: number): string;
  export function fraction(): number;
  export function choice<T>(array: T[]): T;
}
