import MongoEntity from '../connectors/mongo_entity';
import MongoConnector from '../connectors/mongo_connector';

export default class Solutions extends MongoEntity<Cs.Collections.ISolutionDAO> {
  constructor(connector: MongoConnector) {
    super(connector, 'solutions');
  }
}
