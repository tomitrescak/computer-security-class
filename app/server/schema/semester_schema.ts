import { ApolloModule } from 'apollo-modules';

declare global {
  namespace Cs.Collections {
    interface ISemesterDAO {
      _id?: string;
      name: string;
      practicals: string[];
    }

    interface ISemester {
      _id?: string;
      name: string;
      practicals: IPracticalDAO[];
    }
  }
}

const schema = `
  type Semester {
    _id: String
    name: String
    practicals: [Practical]
  }
`;

const queryText = `
  semesters(userId: String): [Semester]
  semester(id: String): Semester
`;

const queries = {
  async semester(root: any, { id }: any, { semesters }: App.Context): Promise<Cs.Collections.ISemesterDAO> {
    // if (!userId) {
    //   return null;
    // }
    return await semesters.findOneCachedById(id);
  },
  async semesters(root: any, props: any, { semesters }: App.Context): Promise<Cs.Collections.ISemesterDAO[]> {
    // if (!userId) {
    //   return null;
    // }
    return await semesters.findManyCached();
  }
};

const resolvers = {
  Semester: {
    async practicals(semester: Cs.Collections.ISemesterDAO, _: any, { semesters, practicals }: App.Context): Promise<Cs.Collections.IPracticalDAO[]> {
      return await semesters.practicalExercises(semester._id, practicals);
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
