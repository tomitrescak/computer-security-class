import MongoEntity from '../connectors/mongo_entity';
import MongoConnector from '../connectors/mongo_connector';

export default class Exercise extends MongoEntity<Cs.Collections.IExerciseDAO> {
  constructor(connector: MongoConnector) {
    super(connector, 'exercises');
  }
}
