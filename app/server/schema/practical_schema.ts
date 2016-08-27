import { ApolloModule } from 'apollo-modules';

declare global {
  namespace Cs.Entities {
    interface IPractical extends Cs.Collections.IPracticalEntity {
      exercises: IExercise[];
    }
  }
  namespace Cs.Collections {
    interface IPracticalEntity {
      _id?: string;
      name: string;
      description: string;
    }
    interface IPracticalDAO extends IPracticalEntity {

      exercises: string[];
    }
  }
}

const schema = `
  type Practical {
    _id: String
    name: String
    description: String
    exercises: [Exercise]
  }
`;

const queryText = `
  practical(id: String, userId: String): Practical
`;

const queries = {
  async practical(root: any, { id }: any, { userId, practicals }: App.Context): Promise<Cs.Collections.IPracticalDAO> {
    // if (!userId) {
    //   return;
    // }
    return await practicals.findOneCachedById(id);
  }
};

const resolvers = {
  Practical: {
    exercises(practical: Cs.Collections.IPracticalDAO, _: any, { practicals, exercises }: App.Context) {
      return practicals.practicalExercises(practical._id, exercises );
    }
  }
};

const definition: ApolloModule = {
  schema,
  resolvers,
  queries,
  queryText
};

export default definition;
