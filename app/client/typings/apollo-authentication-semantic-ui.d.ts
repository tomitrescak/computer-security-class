declare namespace AccountsUI {
  export interface User {
    _id: string;
    profile: any;
    roles: string[];
    isRole(role: string | string[]): boolean;
    isAdmin(): boolean;
  }
}

declare module 'apollo-authentication-semantic-ui' {
  export class AccountsView extends __React.Component<{}, {}> { }
  export class UserView extends __React.Component<{}, {}> { }
  export function reducer(context: () => ({ Store: any })): (state: any, action: any) => any;

  interface IState<T extends AccountsUI.User> {
    view?: string;
    error?: string;
    info?: string;
    token?: string;
    user?: T;
    userId?: string;
    loggingIn?: boolean;
  }
}
