
import UserModel from '../modules/authentication/authentication';
import PracticalModel from './practical_model';
import ExerciseModel from './exercise_model';
import SolutionsModel from './solutions_model';
import PossibilitiesModel from './possibilities_model';
import QuestionsModel from './questions_model';
import SemestersModel from './semesters_model';

declare global {
  namespace App {
    export interface Context {
      userId: string;
      userRoles: string[];
      userEmail: string; 
      user: UserModel;
      practicals: PracticalModel;
      exercises: ExerciseModel;
      solutions: SolutionsModel;
      possibilities: PossibilitiesModel;
      questions: QuestionsModel;
      semesters: SemestersModel;
    }
  }
}

export default function (conn: any) {
  const user = new UserModel(conn, 'users');
  user.fixtures();

  return {
    user,
    practicals: new PracticalModel(conn),
    exercises: new ExerciseModel(conn),
    solutions: new SolutionsModel(conn),
    possibilities: new PossibilitiesModel(conn),
    questions: new QuestionsModel(conn),
    semesters: new SemestersModel(conn)
  };
};
