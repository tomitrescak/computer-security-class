import HomeView from '../components/home_view';
import AuthContainer from '../../core/containers/auth_container';
import { connect, loadingContainer } from 'apollo-mantra';
import { graphql } from 'react-apollo';

const withSemesters = graphql(gql`
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
    `, {
    options: (ownProps: any) => ({
      variables: {
        userId: ownProps.user
      }
    })
  });

const mapStateToProps = (context: Cs.IContext, state: Cs.IState) => ({
  context,
  user: state.accounts.user
});

const WithSemesterData = withSemesters(loadingContainer(HomeView));
export default connect(mapStateToProps)(WithSemesterData);
