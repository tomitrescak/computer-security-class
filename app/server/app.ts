import { startExpress } from './express';

import { MongoConnector } from 'apollo-connector-mongodb';

// console.log(schemas.schema);
// console.log('--------------------------')
// console.log(schemas.resolvers);

const mongoURL = process.env.MONGODB_PORT_27017_TCP_ADDR ?
  ('mongodb://' + process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT) :
   'mongodb://localhost:27017';
const fullMongoURL = mongoURL + '/CsNew';

const conn = new MongoConnector(fullMongoURL);
conn.connect(() => {
  // init express and apollo
  startExpress(conn);
});
