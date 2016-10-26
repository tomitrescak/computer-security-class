import { ApolloModule } from 'apollo-modules';

declare global {
  namespace Cs.Entities {
    interface Group<T> {
      key: string;
      values: T[];
    }
  }
}

function groupByArray<T>(xs: Array<T>, key: string | Function): Cs.Entities.Group<T>[] {
  return xs.reduce(function (rv, x) {
    let v = key instanceof Function ? key(x) : x[key];
    let el = rv.find((r: any) => r && r.key === v);
    if (el) {
      el.values.push(x);
    } else {
      rv.push({
        key: v,
        values: [x]
      });
    }
    return rv;
  }, []
  );
}

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
  marks(semesterId: String): [String]
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
    return await semesters.findAllCached();
  },
  async marks(root: any, { semesterId }: any, { solutions, semesters, practicals, users, exercises, userRoles }: App.Context): Promise<string[][]> {
    const allSolutions = await solutions.find({ semesterId }).toArray();
    const semester = await semesters.findOneCachedById(semesterId);
    const pracs = await practicals.find({ _id: { $in: semester.practicals } }).sort({ name: 1}).toArray();
    let excs: Cs.Collections.IExerciseDAO[] = [];
    for (let p of pracs) {
      const es = await exercises.find({ _id: { $in: p.exercises } }).toArray();
      es.forEach((e) => excs.push(e));
    };

    // if (userRoles.indexOf('tutor') === -1) {
    //   throw new Error('Not authorised!');
    // }

    // the output will be table
    //                   | practicalId  | practicalId |
    // userId | userName | points       | points .... | total  

    // first group by userId
    const rows: string[][] = [];
    const headerRow: string[] = pracs.map(p => p.name);
    headerRow.unshift('');
    headerRow.unshift('');
    rows.push(headerRow);

    const userGroups = groupByArray(allSolutions, 'userId');
    for (let group of userGroups) {
      const userId = group.key;
      const user = await users.findOneCachedById(userId);
      const userName = group.values[0].user;

      const row = [userName + ',' + user.emails[0].address];
      rows.push(row);

      const practicalGroups = groupByArray(group.values, 'practicalId');
      let total = 0;
      for (let p of pracs) {
        const practicalGroup = practicalGroups.find(g => g.key === p._id);
        if (!practicalGroup) {
          row.push('');
          continue;
        }

        // total exercises
        const prac = pracs.find((p) => p._id === practicalGroup.key);
        if (!prac) {
          continue;
        }
        const totalExercises = prac.exercises.reduce((prev, next) => prev + excs.find((e) => e._id === next).questions.length, 0) - 1;

        // presence 
        const presence = practicalGroup.values.filter((p) => p.exerciseId === 'XQi3mLyxpDiWnZsS0').reduce((prev, current) => prev + (current.mark ? current.mark : 0), 0);

        // calculate summary
        const others = practicalGroup.values.filter((p) => p.exerciseId !== 'XQi3mLyxpDiWnZsS0').reduce((prev, current) => prev + (current.mark ? current.mark : 0), 0);

        const sum = Math.round(5 * (presence / 100) + 5 *
          (others / (totalExercises * 100)));
        total += sum;
        
        row.push(sum.toString());
      }
      row.push(total.toString());
    }
    headerRow.push('TOTAL');
    return rows.sort((a, b) => a[0] < b[0] ? -1 : 1);
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
