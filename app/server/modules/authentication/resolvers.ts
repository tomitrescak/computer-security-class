import User, { UserEntity, AccountsServices, Token } from './authentication';

interface Context {
  user: User;
  userId: string;
}


// function formatResponse(response: any, apolloOptions: ApolloOptions) {
//   if (apolloOptions.context && apolloOptions.context.errors) {
//     if (!response.data.errors) {
//       response.data.errors = [];
//     }
//     response.data.errors.concat(apolloOptions.context.errors);
//   }

//   // if (apolloOptions.formatResponse) {
//   //   response = apolloOptions.formatResponse(response, apolloOptions);
//   // }
//   return response;
// }

export function modifyOptions(req: any, apolloOptions: ApolloOptions): void {
  if (req.headers.authorization) {
    apolloOptions.context.user.modifyContext(req.headers.authorization, apolloOptions.context);
  }
}

export const resolvers = {
  User: {
    emails(user: UserEntity) {
      return user.emails;
    },
    services(user: UserEntity) {
      return user.services;
    },
    profile(user: UserEntity) {
      return user.profile;
    }
  },
  AccountServices: {
    password(services: AccountsServices) {
      return services.password;
    },
    email(services: AccountsServices) {
      return services.email;
    }
  },
  Token: {
    user(token: Token) {
      return token.user;
    }
  }
};

export const queries = {
  user(model: User, { id }: any, context: Context) {
    id = id ? id : context.userId;
    return context.user.getUser(id);
  },
  async users(user: User, _: any, context: Context) {
    console.log('getting users ...');
    return context.user.getUsers();
  },
  cachedUsers(user: User, _: any, context: Context) {
    return context.user.getCachedUsers();
  }
};

export const mutations = {
  createAccount(_: any, args: any, context: Context) {
    const { email, password, profile } = args.user;
    return context.user.create(null, email, password, profile);
  },
  createAccountAndLogin(_: any, args: any, context: Context) {
    const { email, password, profile } = args.user;
    return new Promise((resolve: Function, reject: any) => {
      context.user.create(null, email, password, profile).then(() => {
        context.user.login(email, password).then((result) => {
          resolve(result);
        }, reject);
      }, reject);
    });
  },
  loginWithPassword(_: any, args: any, context: Context) {
    const { email, password } = args.user;
    return context.user.login(email, password);
  },
  requestResendVerification(_: any, args: any, context: Context) {
    const { email } = args;
    return context.user.requestVerification(email);
  },
  verify(_: any, args: any, context: Context) {
    const { token } = args;
    return context.user.verify(token);
  },
  resume(_: any, args: any, context: Context) {
    const { token } = args;
    return context.user.resume(token);
  },
  requestResetPassword(_: any, args: any, context: Context) {
    const { email } = args;
    return context.user.requestResetPassword(email);
  },
  resetPassword(_: any, args: any, context: Context) {
    const { token, password } = args;
    return context.user.resetPassword(token, password);
  }
};

