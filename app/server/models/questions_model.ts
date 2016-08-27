import MongoEntity from '../connectors/mongo_entity';
import MongoConnector from '../connectors/mongo_connector';

export default class Questions extends MongoEntity<Cs.Collections.IQuestionDAO> {
  constructor(connector: MongoConnector) {
    super(connector, 'questions');
  }
}
