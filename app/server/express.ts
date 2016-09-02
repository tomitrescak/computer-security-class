import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as apollo from 'apollo-server';
import * as path from 'path';
import * as fs from 'fs';
import * as cors from 'cors';
// import * as morgan from 'morgan';

import { createServer } from 'apollo-modules';
import initSchema from './schema/index';
import initContext from './models/context';
import MongoConnector from './connectors/mongo_connector';

import { makeExecutableSchema } from 'graphql-tools';
import * as historyAPIFallback from 'connect-history-api-fallback';

const port = 3002;

// create root url
if (!process.env.ROOT_URL) {
  process.env.ROOT_URL = `http://localhost:${port}/`;
  console.warn('ROOT_URL not set, estimated to: ' + process.env.ROOT_URL);
}

const expressPort = process.env.EXPRESS_PORT || port;
const app = express();

export function startExpress(conn: MongoConnector) {
  try {
    fs.statSync('dist');
    console.log('Serving static build from dist/');
    console.log('Run `npm run clean` to return to development mode');
    app.use('/', express.static(path.join(__dirname, '../../dist')));
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
  } catch (e) {
    console.log('Serving development build with nwb middleware');
    console.log('Run `npm run build` to create a production build');
    app.use(historyAPIFallback());
    app.use(require('nwb/express')(express, { reload: true }));
  }

  // setup logging
  // app.use(morgan('combined'));

  // setup basic properties for parsing requests
  app.use(bodyParser.json());

  // setup static paths
  // const indexPath = path.resolve('public/index.html');
  // const staticPath = path.resolve('public');
  // app.use(express.static(staticPath));

  // setup apollo
  const modules = initSchema();
  const context = initContext(conn);
  const schema = makeExecutableSchema({ typeDefs: modules.schema, resolvers: modules.resolvers, allowUndefinedInResolve: true });
  const graphqlOptions = {
    context,
    modules,
    schema
  };

  // const allowCrossDomain = function (req, res, next) {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type');

  //   next();
  // };
  // app.use(allowCrossDomain);

  // setup cors
  app.use('*', cors());

  app.use('/graphql', apollo.apolloExpress(createServer(graphqlOptions)));
  app.use('/graphiql', apollo.graphiqlExpress({ endpointURL: '/graphql' }));

  // 

  // setup spa
  // app.get('*', function (req, res) {
  //   res.sendFile(indexPath);
  // });

  // start server
  app.listen(expressPort, () => {
    console.log(`Express server is listen on ${expressPort}`);
  });
}
