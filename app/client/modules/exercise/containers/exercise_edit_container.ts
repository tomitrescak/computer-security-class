import ExerciseView, { IContainerProps, IComponentMutations, IComponentProps } from '../components/exercise_edit_view';
import { connect, loadingContainer } from 'apollo-mantra';
import * as actions from '../actions/exercise_actions';
import * as Random from 'meteor-random';

const mapQueriesToProps = (context: Cs.IContext, { state, ownProps }: Apollo.IGraphQlProps<IContainerProps>): Apollo.IGraphqlQuery => {
  return {
    data: {
      query: gql`
      query exercise($exerciseId: String, $userId: String) {
        exercise(id: $exerciseId, userId: $userId) {
          _id
          name
          group
          instructions
          questions {
            _id
            description
            question
            expectedAnswer
            validation
            control
            points
            possibilities {
              question
              answer
            }
          }
        }
      }

    `,
      variables: {
        exerciseId: ownProps.params.exerciseId,
        userId: state.accounts.userId
      }
    },
  }
};

const mapMutationsToProps = (context: Cs.IContext, { state, ownProps }: Apollo.IGraphQlProps<IContainerProps>): IComponentMutations => ({
  save: (exerciseId: string) => ({
    mutation: gql`
        mutation save($exercise: ExerciseInput!) {
          save(exercise: $exercise) 
        }
      `,
    variables: {
      exercise: context.Store.getState().exercise.exercises[exerciseId]
    },
  }),
});

const mapStateToProps = (context: Cs.IContext, state: Cs.IState, ownProps: IContainerProps): IComponentProps => ({
  context,
  userId: state.accounts.userId,
  exercise: state.exercise.exercises[ownProps.params.exerciseId]
});

const mapDispatchToProps = (context: Cs.IContext, dispatch: Function, ownProps: IContainerProps) => ({
  insertQuestion() {
    dispatch(actions.insertQuestion(ownProps.params.exerciseId, Random.id()));
  }
})

export default connect({ mapQueriesToProps, mapMutationsToProps, mapStateToProps, mapDispatchToProps })(loadingContainer(ExerciseView));
