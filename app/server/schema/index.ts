import { addModules } from 'apollo-modules';
import users from 'apollo-module-authentication';
// process all

import profile from './profile_schema';
import root from './root_schema';
import date from './date_schema';
import semester from './semester_schema';
import practical from './practical_schema';
import exercise from './exercise_schema';

export default function() {
  return addModules([
    root,
    date,
    exercise,
    practical,
    profile,
    semester,
    users
  ]);
}
