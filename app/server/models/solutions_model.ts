import { MongoConnector, MongoEntity } from 'apollo-connector-mongodb';

export default class Solutions extends MongoEntity<Cs.Collections.ISolutionDAO> {
  constructor(connector: MongoConnector) {
    super(connector, 'solutions');
  }
}
