import HomeView from '../components/home_view';
import AuthContainer from '../../core/containers/auth_container';
import { connect, loadingContainer } from 'apollo-mantra';

const mapQueriesToProps = (context: Cs.IContext, { state, ownProps }: Apollo.IGraphQlProps<{}>): Apollo.IGraphqlQuery => {
  return {
    data: {
      query: gql`
      query semesters($userId: String) {
        semesters(userId: $userId) {
          _id,
          name,
          practicals {
            _id
            name
            description
          }
        }
      }
    `,
      variables: {
        userId: state.accounts.user
      }
    }
  };
};

const mapStateToProps = (context: Cs.IContext, state: Cs.IState) => ({
  context,
  user: state.accounts.user
});

export default connect({ mapQueriesToProps, mapStateToProps })(loadingContainer(HomeView));

//export default AuthContainer(HomeView);