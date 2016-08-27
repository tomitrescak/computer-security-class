// import PracticalListView from './practical_list_view';
// import { connect } from 'apollo-mantra';

// const mapQueriesToProps = (context: Cs.IContext, { state, ownProps }: Apollo.IGraphQlProps<{}>): Apollo.IGraphqlQuery => ({
//   data: {
//     query: gql`{
//       practicals {
//         _id,
//         name
//       }
//     }`,
//   }
// });

// const mapStateToProps = (context: Cs.IContext, state: Cs.IState) => ({
//   user: state.accounts.user
// });

// export default connect({mapQueriesToProps, mapStateToProps})(HomeView);