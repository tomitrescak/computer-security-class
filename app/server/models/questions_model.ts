import { MongoConnector, MongoEntity } from 'apollo-connector-mongodb';

export default class Questions extends MongoEntity<Cs.Collections.IQuestionDAO> {
  constructor(connector: MongoConnector) {
    super(connector, 'questions');
  }
}
