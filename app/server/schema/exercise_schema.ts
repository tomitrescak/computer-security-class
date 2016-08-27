import * as Random from 'meteor-random';
import { ioSchema, ApolloModule } from 'apollo-modules';

declare global {
  namespace Cs.Entities {
    interface ISolution {
      _id?: string;
      userId: string;
      user: string;
      semesterId: string;
      practicalId: string;
      exerciseId: string;
      questionId: string;
      userQuestion?: string;
      expectedAnswer?: string;
      userAnswer?: string;
      mark?: number;
      created?: Date;
      modified?: number;
      finished?: boolean;
      tutorComment?: string;
    }

    interface IQuestionPossibilities {
      _id?: string;
      possibilities: IQuestionPossibility[];
    }

    interface IQuestionPossibility {
      question: string;
      answer: string;
    }

    interface IQuestionBase {
      _id?: string;
      description?: string;
      question?: string;
      expectedAnswer?: string;
      control?: "input" | "textbox";
      validation?: string;
      points?: number;
    }

    interface IQuestion extends IQuestionBase {
      possibilities?: IQuestionPossibilities;
    }

    interface IExerciseBase {
      _id?: string;
      name: string;
      instructions: string;
      group?: string;
      points: number;
    }

    interface IExercise extends IExerciseBase {
      questions: IQuestion[];
    }
  }

  namespace Cs.Collections {
    interface IExerciseDAO extends Cs.Entities.IExerciseBase {
      questions: string[];
    }

    interface IQuestionDAO extends Cs.Entities.IQuestionBase {
      possibilitiesGroupId?: string;
    }

    interface IQuestionPossibilitiesDAO extends Cs.Entities.IQuestionPossibilities {
    }

    interface IQuestionPossibilityDAO extends Cs.Entities.IQuestionPossibility {
    }

    interface ISolutionDAO extends Cs.Entities.ISolution {
    }
  }
}

const schema = `
  ${ioSchema(`Exercise$Input {
    _id: String
    name: String
    instructions: String
    group: String
    questions: [Question$Input]
  }`)}

  ${ioSchema(`Question$Input {
    _id: String
    description: String
    question: String
    expectedAnswer: String
    validation: String
    control: String
    possibilities: [Possibility$Input]
    points: Float
  }`)}

  ${ioSchema(`Possibility$Input {
    question: String
    answer: String
  }`)}

  type Solution {
    _id: String
    userId: String
    user: String
    semesterId: String
    practicalId: String
    exerciseId: String
    questionId: String
    userQuestion: String
    expectedAnswer: String
    userAnswer: String
    mark: Float
    created: Date
    modified: Date
    finished: Boolean
    tutorComment: String
  }
`;

const queryText = `
  exercise(id: String, userId: String): Exercise
  practicalSolutions(semesterId: String, practicalId: String, userId: String): [Solution]
  solutions(semesterId: String, practicalId: String, exerciseId: String, userId: String): [Solution]
  markingSolutions(semesterId: String, practicalId: String, lastModification: Date, userId: String): [Solution]
`;

const queries = {
  async exercise(root: any, { id }: any, { userId, exercises }: App.Context ): Promise<Cs.Collections.IExerciseDAO> {
    if (!userId) {
      return null;
    }
    return await exercises.findOne({ _id: id });
  },
  async markingSolutions(root: any, { semesterId, practicalId, lastModification }: any, { userRoles, userId, solutions }: App.Context): Promise<Cs.Collections.ISolutionDAO[]> {
    if (!userId || userRoles.indexOf('tutor') === -1) {
      return [];
    }
    console.log(lastModification);
    return await solutions.find({ semesterId, practicalId, modified: { $gt: lastModification } }).toArray();
  },
  async practicalSolutions(root: any, { semesterId, practicalId }: any, { userId, solutions }: App.Context): Promise<Cs.Collections.ISolutionDAO[]> {
    const options = { expectedAnswer: 0 };
    return await solutions.find({ userId, semesterId, practicalId }, options).toArray();
  },
  async solutions(root: any, { semesterId, practicalId, exerciseId }: any, { userId, userName, solutions, exercises, questions, possibilities }: App.Context): Promise<Cs.Collections.ISolutionDAO[]> {
    if (!userId) {
      return [];
    }
    const options = { expectedAnswer: 0 };
    let sols = await solutions.find({ userId, semesterId, practicalId, exerciseId }, options).toArray();

    // if there are no attempted solutions pre create ones
    if (sols.length === 0) {
      const exercise = await exercises.findOne({ _id: exerciseId });
      const solutionQuestions = await questions.find({ _id: { $in: exercise.questions } }).toArray();
      const created = new Date();

      for (let question of solutionQuestions) {

        // randomly choose an option
        let userQuestion: string = null;
        let expectedAnswer: string = null;
        if (question.possibilitiesGroupId) {
          const group = await possibilities.findOne({ _id: question.possibilitiesGroupId });
          const possibility = <Cs.Collections.IQuestionPossibilityDAO> Random.choice(group.possibilities);
          userQuestion = possibility.question;
          expectedAnswer = possibility.answer;
        }

        const solution: Cs.Collections.ISolutionDAO = {
          userId: userId,
          user: userName,
          exerciseId: exerciseId,
          questionId: question._id,
          semesterId,
          practicalId,
          userQuestion,
          expectedAnswer,
          userAnswer: '',
          created
        };

        solutions.insert(solution);
      }

      // refetch data from db
      sols = await solutions.find({ userId, semesterId, exerciseId }, options).toArray();
    }

    // return the user option, now for sure there are some
    return sols;

  }
};

const mutationText = `
  answers(solutionIds: [String]!, userAnswers: [String]!, finished: Boolean): [Float]
  mark(solutionIds: [String]!, comments: [String]!, marks: [Float]!): Boolean
  save(exercise: ExerciseInput): Boolean
`;

interface IActionAnswer {
  solutionIds: string[];
  userAnswers: string[];
  finished: boolean;
}

interface IActionMark {
  solutionIds: string[];
  comments: string[];
  marks: number[];
}

interface IActionSave {
  exercise: Cs.Entities.IExercise;
}

const mutations = {
  mark(root: any, { solutionIds, comments, marks }: IActionMark, { userRoles, solutions }: App.Context) {
    // check for tutor
    if (!userRoles || userRoles.indexOf('tutor') === -1) {
      throw new Error('Not authorised!');
    }

    // let total = 0;
    for (let i = 0; i < solutionIds.length; i++) {
      let cm = marks[i] ? marks[i] : 0;
      solutions.update({ _id: solutionIds[i] }, {
        $set: {
          mark: cm,
          tutorComment: comments[i]
        }
      });
    }
  },
  async save(root: any, { exercise }: IActionSave, { userRoles, exercises, questions }: App.Context) {
    if (!userRoles || userRoles.indexOf('tutor') === -1) {
      throw new Error('Not authorised!');
    }

    // first update the exercise
    await exercises.update({ _id: exercise._id }, {
      $set: {
        name: exercise.name,
        instructions: exercise.instructions,
        group: exercise.group,
        questions: exercise.questions.map((e) => e._id)
      }
    });

    // then update all questions
    for (let question of exercise.questions) {
      questions.update({ _id: question._id }, { $set: question }, { upsert: true });
    }
  },
  async answers(root: any, { solutionIds, userAnswers, finished }: IActionAnswer, { userId, solutions }: App.Context): Promise<number[]> {
    if (!solutionIds || !userAnswers || solutionIds.length !== userAnswers.length) {
      console.error('Unexpected input for "answers"');
      return;
    }

    try {
      let answers: number[] = [];
      const modified = new Date;

      for (let i = 0; i < solutionIds.length; i++) {
        const solutionId = solutionIds[i];
        const userAnswer = userAnswers[i]; // .replace(/ /g, '').toLowerCase();

        const solution = await solutions.findOne({ _id: solutionId, userId });
        if (!solution) {
          throw new Error('Access violation!');
        }
        // const exercise = Exercises.findOne(solution.exerciseId);
        // const question = Questions.findOne(solution.questionId);

        // // we either have to check according to custom question (from possibilities) or default question (from question)
        // let expectedAnswer: string = solution.expectedAnswer ? solution.expectedAnswer : question.expectedAnswer;
        // let mark: number = null;

        // if (expectedAnswer) {
        //   // remove spacen and put all to lowercas
        //   expectedAnswer = expectedAnswer.replace(/ /g, '').toLowerCase();

        //   // question can contain a validation script
        //   // validation script returns function
        //   if (question.validation) {
        //     let validationText = `function (exercise, question, expectedAnswer, userAnswer) { ${question.validation} }`;
        //     let validation = eval(validationText);
        //     if (validation(exercise, question, expectedAnswer, userAnswer)) {
        //       mark = question.points;
        //     }
        //   } else {
        //     if (expectedAnswer && userAnswer) {
        //       mark = expectedAnswer === userAnswer ? question.points : 0;
        //     }
        //   }
        // }

        answers[i] = 0;
        console.log(userAnswer);
        await solutions.update({ _id: solution._id }, { $set: { userAnswer, finished, modified } });
      }
      return answers;
    } catch (ex) {
      console.log(ex.message);
      console.log(ex.stack);
    }
  }
};

const resolvers = {
  Exercise: {
    group(exercise: Cs.Collections.IExerciseDAO) {
      return exercise.group ? exercise.group : '';
    },
    async questions(exercise: Cs.Collections.IExerciseDAO, params: any, { userRoles, questions }: App.Context): Promise<Cs.Collections.IQuestionDAO[]> {
      let options = {};
      if (!userRoles || userRoles.indexOf('tutor') === -1) {
        options = { expectedAnswer: 0, validation: 0, possibilities: 0 };
      }

      const quests = await questions.find({ _id: { $in: exercise.questions } }, options).toArray();
      const resultQuestions: Cs.Collections.IQuestionDAO[] = [];

      for (let i = 0; i < exercise.questions.length; i++) {
        const q = quests.find(q => q._id === exercise.questions[i]);
        resultQuestions.push(q);
      }
      return resultQuestions;
    }
  },
  Question: {
    async possibilities(question: Cs.Collections.IQuestionDAO, _: any, { possibilities }: App.Context): Promise<Cs.Collections.IQuestionPossibilityDAO[]> {
      if (question.possibilitiesGroupId) {
        const result = await possibilities.findOne({ _id: question.possibilitiesGroupId });
        return result.possibilities;
      } else {
        return null;
      }
    },
    expectedAnswer(question: Cs.Collections.IQuestionDAO) {
      return question.expectedAnswer ? question.expectedAnswer : null;
    },
    validation(question: Cs.Collections.IQuestionDAO) {
      return question.validation ? question.validation : null;
    },
    description(question: Cs.Collections.IQuestionDAO) {
      return question.description ? question.description : null;
    },
    control(question: Cs.Collections.IQuestionDAO) {
      return question.control ? question.control : null;
    }
  }
};

const definition: ApolloModule = {
  schema,
  resolvers,
  queries,
  queryText,
  mutationText,
  mutations
};

export default definition;
