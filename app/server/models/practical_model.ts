import MongoEntity from '../connectors/mongo_entity';
import MongoConnector from '../connectors/mongo_connector';
import DataLoader = require('dataloader');

export default class Practical extends MongoEntity<Cs.Collections.IPracticalDAO> {
  private _exercisesLoader: DataLoader<string, Cs.Collections.IExerciseDAO[]>;

  constructor(connector: MongoConnector) {
    super(connector, 'practicals');
  }

  clearUpdateCaches(selector: any) {
    super.clearUpdateCaches(selector);
    if (selector._id) {
      this._exercisesLoader.clear(selector._id);
    }
  }

  practicalExercises(practicalId: string, exercises: MongoEntity<Cs.Collections.IExerciseDAO>) {
    if (!this._exercisesLoader) {
      this._exercisesLoader = new DataLoader<string, Cs.Collections.IExerciseDAO[]>((keys: string[]) => {
        return Promise.all(keys.map(async (id) => {
          const practical = await this.findOneCachedById(id);
          return await exercises.find({ _id: { $in: practical.exercises } }).toArray();
        }));
      });
    }
    return this._exercisesLoader.load(practicalId);
  }
}
