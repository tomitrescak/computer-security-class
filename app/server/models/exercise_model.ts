import { MongoConnector, MongoEntity } from 'apollo-connector-mongodb';

export default class Exercise extends MongoEntity<Cs.Collections.IExerciseDAO> {
  constructor(connector: MongoConnector) {
    super(connector, 'exercises');
  }
}
