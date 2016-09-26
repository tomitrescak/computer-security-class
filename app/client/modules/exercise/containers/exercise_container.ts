import ExerciseView, { IComponentProps, IComponent } from '../components/exercise_view';
import { connect } from 'apollo-mantra';
import { graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';

const mapStateToProps = (context: Cs.IContext, state: Cs.IState): IComponentProps => ({
  context,
  user: state.accounts.user,
  userId: state.accounts.userId,
});

const withExerciseData = graphql(gql`
  query exercise($exerciseId: String) {
    exercise(id: $exerciseId) {
      _id
      name
      group
      instructions
      questions {
        _id
        description
        question
        control
        points
      }
    }
  }
  `, {
    name: 'exerciseData',
    // Note ownProps here are the props that are passed into `MyComponentWithData`
    // when it is used
    options(ownProps: IComponent) {
      return {
        variables: {
          exerciseId: ownProps.params.exerciseId
        }
      };
    }
  });

function exerciseSort(exercise: Cs.Entities.IExercise) {
  return (a: Cs.Entities.ISolution, b: Cs.Entities.ISolution) => {
    const a1 = exercise.questions.findIndex(q => q._id === a.questionId);
    const a2 = exercise.questions.findIndex(q => q._id === b.questionId);
    return a1 - a2;
  };
}

const withSolutionData = graphql(gql`
  query solutions($exerciseId: String, $practicalId: String, $semesterId: String) {
    solutions(semesterId: $semesterId, practicalId: $practicalId, exerciseId: $exerciseId) {
      _id
      questionId
      userQuestion
      userAnswer
      mark
      tutorComment
      finished
    }
  }
`, {
    name: 'solutionData',
    // Note ownProps here are the props that are passed into `MyComponentWithData`
    // when it is used
    options(ownProps: IComponent) {
      return {
        variables: {
          exerciseId: ownProps.params.exerciseId,
          semesterId: ownProps.params.semesterId,
          practicalId: ownProps.params.practicalId
        }
      };
    },
    props: ({ solutionData, ownProps: { exerciseData } }: any): any => {
      if (solutionData.loading || !exerciseData || exerciseData.loading) {
        return { initialValues: { } };
      };
      return {
        initialValues: {
          solutions: solutionData.solutions.sort(exerciseSort(exerciseData.exercise))
        },
      };
    }
  });

const withMutation = graphql(gql`
  mutation answers($solutionIds: [String]!, $userAnswers: [String]!, $finished: Boolean) {
    answers(solutionIds: $solutionIds, userAnswers: $userAnswers, finished: $finished) {
      _id
      questionId
      userQuestion
      userAnswer
      mark
      tutorComment
      finished
    }
  }
`, {
    props: ({ ownProps, mutate }: Apollo.IMutationProps<IComponent, any>) => ({
      answer(solutionIds: string[], userAnswers: string[], finished: boolean) {
        return mutate({
          variables: {
            solutionIds,
            userAnswers,
            finished
          },
        }).then((result: any) => {
          // if we have the data we want
          if (result.data) {
            ownProps.context.Utils.Ui.alert('Life is good!');
          };
        }).catch((error) => {
          ownProps.context.Utils.Ui.alertDialog('Save Error', error.message);
        });
      }
    })
  });

const withForm = reduxForm({
  form: 'exerciseForm',
  enableReinitialize: true
});

const ExerciseWithForm = withForm(ExerciseView);
const ExerciseViewSolutionData = withSolutionData(ExerciseWithForm);
const ExerciseViewWithExerciseData = withExerciseData(ExerciseViewSolutionData);
const ExerciseWithMutation = withMutation(ExerciseViewWithExerciseData);

export default connect({ mapStateToProps })(ExerciseWithMutation);
