import { getQuery, copyQuery } from 'apollo-mantra';
import { bindingReducer } from '../../../helpers/redux_binding';
import * as Actions from './exercise_actions';
import update from 'react-addons-update';

export interface IExerciseState {
  exercises: {
    [id: string]: Cs.Entities.IExercise
  };
}

export default function reducer(state: IExerciseState = { exercises: {}}, action: any) {
  return state;
}