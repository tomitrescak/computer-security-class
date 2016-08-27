import PracticalView, { IContainerProps, IComponentProps } from './practical_view';
import { connect, loadingContainer } from 'apollo-mantra';

const mapQueriesToProps = (context: Cs.IContext, { state, ownProps }: Apollo.IGraphQlProps<IContainerProps>): Apollo.IGraphqlQuery => ({
  data: {
    query: gql`
      query practical($id: String, $userId: String) {
        practical(id: $id, userId: $userId) {
          _id,
          name,
          description,
          exercises {
            _id
            name
            group
            questions {
              _id
            }
          }
        }
      }
    `,
    variables: {
      id: ownProps.params.practicalId,
      userId: state.accounts.userId
    }
  },
  solutionsData: {
    query: gql`
      query practicalSolutions($semesterId: String, $practicalId: String, $userId: String) {
        practicalSolutions(semesterId: $semesterId, practicalId: $practicalId, userId: $userId) {
          _id,
          exerciseId,
          mark
        }
      }
    `,
    variables: {
      semesterId: ownProps.params.semesterId,
      practicalId: ownProps.params.practicalId,
      userId: state.accounts.userId
    }
  }
});

const mapStateToProps = (context: Cs.IContext, state: Cs.IState): IComponentProps => ({
  context,
  user: state.accounts.user
});

export default connect({mapQueriesToProps, mapStateToProps})(loadingContainer(PracticalView));