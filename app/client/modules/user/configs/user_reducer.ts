import { User, Profile } from './user_model';
import { reducer as initAccountReducer, IState as AccountsState } from 'apollo-authentication-semantic-ui';
import { LOGIN } from 'apollo-authentication-semantic-ui/dist/actions/accounts';
import getStore from '../../../configs/store';
import { UserEntity } from 'apollo-module-authentication';
import * as Redux from 'redux';

const profileData = `
  name
`;

declare global {
  namespace Cs {
    export interface User extends UserEntity {
      profile: Profile;
      isAdmin(): boolean;
      isTutor(): boolean;
      isRole(role: string | string[]): boolean;
    }
  }
}

let accountsReducer: any = null;

export default function reducer(state: AccountsState<Cs.User>, action: Redux.IAction) {

  // init reducer if needed
  if (!accountsReducer) {
    accountsReducer = initAccountReducer(() => ({ Store: getStore() }), profileData);
  }

  switch (action.type) {
    case LOGIN:
      let newState = accountsReducer(state, action);
      let user = new User(action['data'].user);
      let otherState = Object.assign({}, newState, {
        user
      });
      return otherState;
    default:
      return accountsReducer(state, action);
  }
}
