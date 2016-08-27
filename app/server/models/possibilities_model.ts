import MongoEntity from '../connectors/mongo_entity';
import MongoConnector from '../connectors/mongo_connector';

export default class Possibilities extends MongoEntity<Cs.Collections.IQuestionPossibilitiesDAO> {
  constructor(connector: MongoConnector) {
    super(connector, 'possibilities');
  }
}
