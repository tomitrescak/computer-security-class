import { getQuery, copyQuery } from 'apollo-mantra';
import { bindingReducer } from '../../../helpers/redux_binding';
import * as Actions from './exercise_actions';
import update from 'react-addons-update';

export interface IExerciseState {
  exercises: {
    [id: string]: Cs.Entities.IExercise
  };
}

const binder = bindingReducer(Actions.UPDATE);

export default function reducer(state: IExerciseState = { exercises: {}}, action: any) {

  // take care of binding calls
  const bindingResult = binder(state, action);
  if (bindingResult) {
    return bindingResult;
  }

  // take care of query copies
  switch (getQuery(action)) {
    case 'exercise':
      return copyQuery(state, 'exercises', action.result.data.exercise);
  }

  switch (action.type) {
    case Actions.INSERT_QUESTION:
      const newExercise = {
        _id: action.questionId,
        points: 0
      };

      return update(state, { exercises: { [action.exerciseId]: { questions: { $push: [newExercise] } }}});
  }

  return state;
}