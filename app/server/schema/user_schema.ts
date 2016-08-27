// import { ApolloModule } from 'apollo-modules';

// interface ISecretsDAO {
//   _id?: string;
//   user: string;
//   date: Date;
// }

// // only on server!!!
// export let Secrets: Mongo.Collection<ISecretsDAO> = new Mongo.Collection<ISecretsDAO>('secrets');

// const queryText = `
//   userSecret: String
// `

// // const mutationText = `
// // `

// const schema = `
//   type Subscription {
//     scheduleId: String
//     tutorId: String
//     tutorName: String
//   }
// `

// const queries = {
//   userSecret(root: any, params: any, { userId }: Apollo.IApolloContext) {
//     if (!userId) {
//       // check if the user has privileges
//       throw new Meteor.Error('403', 'Not authorised! You need to be logged in!');
//     }
//     Secrets.remove({ user: userId });
//     return Secrets.insert({ user: userId, date: new Date() });
//   }
// };

// const mutations = {
// };


// const defintion: IApolloDefinition = {
//   schema,
// //  mutations,
// //  mutationText,
//   queryText,
//   queries
// };

// export default defintion;
