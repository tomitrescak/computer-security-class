import { addModules } from 'apollo-modules';
import authentication from '../modules/authentication/schema';
// process all

// import user from './user_schema';
import date from './date_schema';
import semester from './semester_schema';
import practical from './practical_schema';
import exercise from './exercise_schema';

export default function() {
  return addModules([
    date,
    exercise,
    practical,
    semester,
    authentication
  ]);
}
