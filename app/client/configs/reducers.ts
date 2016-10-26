// here we import all reducers from modules
// this is the root for all reducers so that we can hot reload them

import apolloClient from './apollo';
import accountsReducer from '../modules/user/configs/user_reducer';
import User from '../modules/user/configs/user_model';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import solutionReducer, { ISolutionState } from '../modules/solution/actions/solution_reducer';
import exerciseReducer, { IExerciseState } from '../modules/exercise/actions/exercise_reducer';
import markingReducer, { IMarkingState } from '../modules/marking/actions/marking_reducer';
import practicalReducer, { IPracticalState } from '../modules/practicals/practical_reducer';

import { IState as IAccountsState } from 'apollo-authentication-semantic-ui';
import { IStore as ReduxStore } from 'redux';

// import all other reducers
export default function () {
  const apolloReducer: any = apolloClient.reducer();
  const rootReducer = combineReducers({
    accounts: accountsReducer,
    apollo: apolloReducer,
    form: formReducer,
    routing: routerReducer,
    solution: solutionReducer,
    exercise: exerciseReducer,
    marking: markingReducer,
    practical: practicalReducer
  });

  return rootReducer;

}
// typescript types holding all action creators

declare global {
  namespace Cs {
    export interface IState {
      apollo: IApolloState;
      accounts: IAccountsState<User>;
      solution: ISolutionState;
      exercise: IExerciseState;
      marking: IMarkingState;
      practical: IPracticalState;
    }

    export interface IStore extends ReduxStore<IState> {
    }
  }
}
