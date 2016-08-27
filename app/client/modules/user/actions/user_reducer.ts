// import { AccountsUiUser, reducer as accountsReducer } from 'meteor/tomi:accountsui-semanticui-redux';

import { IState as IAccountsState, reducer as accountsReducer } from 'apollo-authentication-semantic-ui';
import store from '../../../configs/store';

declare global {
  namespace Cs.Accounts {
    interface SystemUser extends AccountsUI.User {
      profile: {
        name: string,
      };
    }
  }
}

// const augmentation = function(defaultUser: any) {
//   return {
//     // add actions and properties
//   };
// };
//
// export default function reducer(state: IAccountsState<Cs.Accounts.SystemUser> = {}, action: any) {
//   // augument user with system specific properties
//   if (action.type === 'ACCOUNTS: Login') {
//     action.user = Object.assign(action.user, augmentation(action.user));
//   }
//   return accountsReducer(state, action);
// }
