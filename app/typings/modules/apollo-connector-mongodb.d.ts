// import MongoConnector from './mongo_connector';
// import * as Random from 'meteor-random';
// import { IDataLoader } from 'dataloader';
// import { Collection, FindOneOptions, Cursor, ReplaceOneOptions, InsertOneWriteOpResult, InsertWriteOpResult, UpdateWriteOpResult, DeleteWriteOpResultObject } from 'mongodb';

// declare module 'apollo-connector-mongodb' {

//   export class MongoConnector {
//     private mongoUrl;
//     private db;
//     constructor(url: string, started?: Function);
//     connect(started?: Function): void;
//     collection<T>(name: string): Collection<T>;
//   }


//   export interface Options<K, V> {
//     batch?: boolean;
//     cache?: boolean;
//     cacheKeyFn?: (key: any) => any;
//     cacheMap?: Map<K, Promise<V>> | 'lru';
//     clearOnInsert?: boolean;
//     clearOnUpdate?: boolean;
//     selectorKeyFn?: (key: any) => any;
//   }
//   export declare class LruCacheWrapper<K, V> {
//     cache: any;
//     constructor();
//     clear(): void;
//     get(key: K): any;
//     set(key: K, value: V): any;
//     delete(key: K): boolean;
//   }
//   export class MongoEntity<T> {
//     connector: MongoConnector;
//     random: typeof Random;
//     private _collectionName;
//     private _collection;
//     private _singleLoader;
//     private _multiLoader;
//     private _insertLoaders;
//     private _updateLoaders;
//     static DefaultCache: any;
//     private _cache;
//     readonly collection: Collection<T>;
//     constructor(connector: MongoConnector, collectionName: string, cache?: any);
//     clearUpdateCaches(selector: any): void;
//     clearInsertCaches(selector: Object): void;
//     assignFilter(object: Object, selector: Object, result: Object, include: 0 | 1): (k: string) => void;
//     filter(object: Object, selector: Object): T;
//     find(selector: Object, fields?: Object, skip?: number, limit?: number, timeout?: number): Cursor<T>;
//     findOne(selector: Object, options?: FindOneOptions): Promise<T>;
//     findOneCached(loader: IDataLoader<string, T>, key: string, selector?: Object): Promise<T>;
//     findOneCachedById(id: string, selector?: Object): Promise<T>;
//     findManyCached(loader: IDataLoader<string, T[]>, key: string, selector?: Object): Promise<T[]>;
//     findAllCached(selector?: Object): Promise<T[]>;
//     addCacheToOptions(options: any): any;
//     insertOne(document: T): Promise<InsertOneWriteOpResult>;
//     insertMany(document: T[]): Promise<InsertWriteOpResult>;
//     deleteOne(selector: Object, many?: boolean): Promise<DeleteWriteOpResultObject>;
//     deleteMany(selector: Object, many?: boolean): Promise<DeleteWriteOpResultObject>;
//     dispose(): Promise<DeleteWriteOpResultObject>;
//     updateOne(selector: Object, update: Object, options?: ReplaceOneOptions): Promise<UpdateWriteOpResult>;
//     updateMany(selector: Object, update: Object, options?: ReplaceOneOptions): Promise<UpdateWriteOpResult>;
//     createLoader(selectorFunction: (key: any) => Promise<any>, options?: Options<any, T | T[]>): any;
//   }

//   export interface ITestingOptions {
//     mongoHost?: string;
//     mongoPort?: string;
//     mongoDisposeTimeout?: number;
//     initContext?: (conn: any) => any;
//   }
//   export declare function config({mongoHost, mongoPort, mongoDisposeTimeout, initContext: ic}: ITestingOptions): void;
//   export declare function getDb(): Promise<Db>;
//   export interface TestOption<T> {
//     data?: T[];
//     name?: string;
//     type?: any;
//     entity?: MongoEntity<T>;
//   }
//   export interface TestOptions {
//     entities?: TestOption<any>[];
//   }
//   export declare function withEntity(test: (...entity: any[]) => any, options?: TestOptions): Promise<any>;
//   export declare function itWithEntity(name: string, func: (...entity: any[]) => any, options?: TestOptions): void;
//   export declare function withContext(test: (context: any) => any, initContextFn?: (conn: any) => any, disconnected?: boolean): Promise<any>;
//   export declare function itWithContext(name: string, func: (context: any) => void, initContextFn?: (conn: any) => any, disconnected?: boolean): void;
//   export declare function getConnector(): Promise<{
//     collection(name: string): Collection<{}>;
//   }>;
//   export declare function disposeDb(immediate?: boolean): void;


// }