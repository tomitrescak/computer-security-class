import { UserModel, IState as AccountsState } from 'apollo-authentication-semantic-ui';

export interface Profile {
  name: string;
}

export class User extends UserModel implements Cs.User {
  profile: Profile;

  isAdmin(): boolean {
    return this.roles.some((r) => r === 'admin');
  }

  isTutor(): boolean {
    return this.roles.some((r) => r === 'tutor');
  }

  isRole(role: string | string[]) {
    if (Array.isArray(role)) {
      return role.some((r) => this.roles.some((d) => d === r));
    }
    return this.roles.some((r) => r === role);
  }

  modifyProfile(user: Cs.User, state: AccountsState<Cs.User>, modification: Object) {
    // change profile
    const profile = Object.assign({}, user.profile, modification);
    // change user
    user = Object.assign({}, user, { profile });
    // change state
    return Object.assign({}, state, { user });
  }
}

export default User;
