import PracticalView, { IComponent, IComponentProps } from './practical_view';
import { connect, loadingContainer } from 'apollo-mantra';
import { graphql } from 'react-apollo';

const withPractical = graphql(gql`
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
  `, {
  name: 'practicalData',
  options: (ownProps: IComponent) => ({
    variables: {
      id: ownProps.params.practicalId,
      userId: ownProps.userId
    }
  })
});


const withSolutions = graphql(gql`
    query practicalSolutions($semesterId: String, $practicalId: String, $userId: String) {
      practicalSolutions(semesterId: $semesterId, practicalId: $practicalId, userId: $userId) {
        _id,
        exerciseId,
        mark
      }
    }
  `, {
  name: 'solutionsData',
  options: (ownProps: IComponent) => ({
    variables: {
      semesterId: ownProps.params.semesterId,
      practicalId: ownProps.params.practicalId,
      userId: ownProps.userId
    }
  })
});

const mapStateToProps = (context: Cs.IContext, state: Cs.IState): IComponentProps => ({
  context,
  userId: state.accounts.userId,
  user: state.accounts.user
});

const WithSolutionData = withSolutions(loadingContainer(PracticalView, ['practicalData', 'solutionsData']));
const WithPracticalData = withPractical(WithSolutionData);
export default connect(mapStateToProps)(WithPracticalData);