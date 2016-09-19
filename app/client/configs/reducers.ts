// here we import all reducers from modules
// this is the root for all reducers so that we can hot reload them

import apolloClient from './apollo';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as accountsReducer } from 'apollo-authentication-semantic-ui';
import solutionReducer, { ISolutionState } from '../modules/solution/actions/solution_reducer';
import exerciseReducer, { IExerciseState } from '../modules/exercise/actions/exercise_reducer';
import markingReducer, { IMarkingState } from '../modules/marking/actions/marking_reducer';
import practicalReducer, { IPracticalState } from '../modules/practicals/practical_reducer';

import { IState as IAccountsState } from 'apollo-authentication-semantic-ui';
import { IStore as ReduxStore } from 'redux';
import context from './context';

// import all other reducers

const rootReducer = combineReducers({
  accounts: accountsReducer(() => context ? context() : null),
  apollo: apolloClient.reducer(),
  form: formReducer,
  routing: routerReducer,
  solution: solutionReducer,
  exercise: exerciseReducer ,
  marking: markingReducer,
  practical: practicalReducer
});

export default rootReducer;

// typescript types holding all action creators

declare global {
  namespace Cs {
    export interface IState {
      apollo: IApolloState;
      accounts: IAccountsState<AccountsUI.User>;
      solution: ISolutionState;
      exercise: IExerciseState;
      marking: IMarkingState;
      practical: IPracticalState;
    }

    export interface IStore extends ReduxStore<IState> {
    }
  }
}
