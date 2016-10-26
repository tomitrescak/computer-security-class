import { MongoConnector, MongoEntity } from 'apollo-connector-mongodb';
import { IDataLoader } from 'dataloader';

const DataLoader = require('dataloader');

export default class Semesters extends MongoEntity<Cs.Collections.ISemesterDAO> {
  private _practicalLoader: IDataLoader<string, Cs.Collections.IPracticalDAO[]>;

  constructor(connector: MongoConnector) {
    super(connector, 'semesters');
  }

  practicalExercises(semesterId: string, practicals: MongoEntity<Cs.Collections.IPracticalDAO>) {
    if (!this._practicalLoader) {
      this._practicalLoader = new DataLoader((keys: string[]) => {
        // console.log('Finding practicals ...');

        return Promise.all(keys.map(async (id) => {
          const semester = await this.findOneCachedById(id);
          return await practicals.collection.find({ _id: { $in: semester.practicals } }, { fields: { _id: 1, name: 1, description: 1 } }).toArray();
        }));
      });
    }
    return this._practicalLoader.load(semesterId);
  }
}
