import MarkingView, { IContainerProps, IComponentActions, IComponentProps, IComponent } from '../components/marking_view';
import { connect, loaderContainer, query } from 'apollo-mantra';
import * as actions from '../actions/marking_actions';
import composer from 'react-functional';

// needed to format dates
require('date-format-lite');

let date = new Date();
date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

function getLastModification() {
  let origDate = date;
  date = new Date();
  return origDate;
}

const mapMutationsToProps = (context: Cs.IContext, { state, ownProps }: Apollo.IGraphQlProps<IContainerProps>): any => ({
  markMutation: (solutionIds: string[], comments: string[], marks: number[]) => ({
    mutation: gql`
        mutation mark(
          $solutionIds: [String]!
          $comments: [String]!
          $marks: [Float]!
        ) {
          mark(
            solutionIds: $solutionIds
            comments: $comments
            marks: $marks
          ) 
        }
      `,
    variables: {
      solutionIds,
      comments,
      marks
    },
  }),
});

const mapStateToProps = (context: Cs.IContext, state: Cs.IState, ownProps: IContainerProps): IComponentProps => ({
  context,
  userId: state.accounts.userId,
  showMarked: state.marking.showMarked,
  showPending: state.marking.showPending,
  solutions: state.marking.solutions,
  practical: state.practical.practicals[ownProps.params.practicalId],
  selectedDate: date['format']('DD/MM/YYYY')
});

const mapDispatchToProps = (context: Cs.IContext, dispatch: Function, ownProps: IContainerProps): IComponentActions => {
  return {
    toggleMarked() {
      dispatch(actions.toggleMarked());
    },
    togglePending() {
      dispatch(actions.togglePending());
    },
    changeDate: (selectedDate) => {
      try {
        date = selectedDate['date']();
      } catch (ex) {
        alert('Error setting date :( - ' + ex);
      }
    }
  }
};

const ComposedMarkingView = composer(MarkingView, {
  componentWillUpdate(oldProps: IComponent, props: IComponent) {
    // init current marking
    const usol = props.solutions.filter((s) => s.userId === props.params.userId && s.exerciseId === props.params.exerciseId);
    props.context.Store.dispatch(actions.initMarking(usol));
  },
  componentWillMount: (props: IComponent) => {
    const state = props.context.Store.getState();
    // load practical
    props.context.Store.dispatch(query({
      query: `
      query practical($practicalId: String, $userId:  String) {
        practical(id: $practicalId, userId: $userId) {
          _id,
          name,
          exercises {
            _id
            name
            group
            instructions
            questions {
              _id
              question
              expectedAnswer
              points
            }
          }
        }
      }
    `,
      variables: {
        practicalId: props.params.practicalId,
        userId: state.accounts.userId,
      }
    }));

    // load solutions
    const poll = () => {
      props.context.Store.dispatch(query({
        query: `
            query markingSolutions($practicalId: String, $semesterId: String, $lastModification: Date, $userId: String) {
              markingSolutions(semesterId: $semesterId, practicalId: $practicalId, lastModification: $lastModification, userId: $userId) {
                _id
                user
                userId
                questionId
                practicalId
                semesterId
                exerciseId
                userQuestion
                userAnswer
                tutorComment
                finished
                modified
                mark
              }
            }
          `,
        variables: {
          practicalId: props.params.practicalId,
          semesterId: props.params.semesterId,
          userId: state.accounts.userId,
          lastModification: getLastModification()
        }
      }));
    };

    poll();
    setInterval(poll, 5000);
  },
});

export default connect({ mapDispatchToProps, mapStateToProps, mapMutationsToProps })(ComposedMarkingView);
