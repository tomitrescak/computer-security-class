import { MongoConnector, MongoEntity } from 'apollo-connector-mongodb';

export default class Possibilities extends MongoEntity<Cs.Collections.IQuestionPossibilitiesDAO> {
  constructor(connector: MongoConnector) {
    super(connector, 'possibilities');
  }
}
