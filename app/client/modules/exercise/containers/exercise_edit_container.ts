import ExerciseView, { IContainerProps, IComponentProps, IComponent } from '../components/exercise_edit_view';
import { connect, loadingContainer } from 'apollo-mantra';
import * as actions from '../actions/exercise_actions';
import * as Random from 'meteor-random';

import { graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';

const withData = graphql(gql`
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
  `, {
    options: (ownProps: IComponent) => ({
      variables: {
        exerciseId: ownProps.params.exerciseId,
        userId: ownProps.userId
      }
    }),
    props: ({ownProps, data}: Apollo.IQueryProps<IComponent, { exercise: Cs.Entities.IExercise }>) => ({
      initialValues: {
        exercise: data.exercise
      }
    })
  });


const withMutation = graphql(gql`
  mutation save($exercise: ExerciseInput!) {
    save(exercise: $exercise) {
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
  {
    props: ({ ownProps, mutate}: Apollo.IMutationProps<IComponent, Cs.Entities.IExercise>) => ({
      save(exerciseForm: { exercise: Cs.Entities.IExercise }) {
        return mutate({
          variables: {
            exercise: exerciseForm.exercise
          }
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
  }
);

// form

const ExerciseForm = reduxForm({
  form: 'exerciseEditForm',
  enableReinitialize: true
})(ExerciseView);

// data

const ExerciseWithData = withData(ExerciseForm);

// mutations

const ExerciseWithMutation = withMutation(ExerciseWithData);

// state

const mapStateToProps = (context: Cs.IContext, state: Cs.IState, ownProps: IContainerProps): IComponentProps => ({
  context,
  userId: state.accounts.userId
});


export default connect({ mapStateToProps })(ExerciseWithMutation);
