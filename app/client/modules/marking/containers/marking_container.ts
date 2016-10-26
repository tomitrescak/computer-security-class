import MarkingView, { IContainerProps, IComponentActions, IComponentProps, IComponent } from '../components/marking_view';
import { connect } from 'apollo-mantra';
import * as actions from '../actions/marking_actions';
import { graphql } from 'react-apollo';
import { createFragment } from 'apollo-client';

// needed to format dates
require('date-format-lite');

const solutionFragment = createFragment(gql`
  fragment solutionFragment on Solution {
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
`);

let date = new Date();
// date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

function getLastModification() {
  let origDate = date;
  date = new Date();
  return origDate;
}

const mapStateToProps = (context: Cs.IContext, state: Cs.IState, ownProps: IContainerProps): IComponentProps => ({
  context,
  userId: state.accounts.userId,
  showMarked: state.marking.showMarked,
  showPending: state.marking.showPending,
  // solutions: state.marking.solutions,
  // practical: state.practical.practicals[ownProps.params.practicalId],
  selectedDate: state.marking.date
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
      dispatch(actions.setDate(selectedDate));
    }
  };
};

const withMutation = graphql(gql`
  mutation mark(
    $solutionIds: [String]!
    $comments: [String]!
    $marks: [Float]!
  ) {
    mark(
      solutionIds: $solutionIds
      comments: $comments
      marks: $marks
    ) {
      ...solutionFragment
    }
  }
`,
  {
    options: (ownProps: IComponent) => ({
      fragments: solutionFragment
    }),
    props: ({ ownProps, mutate }: Apollo.IMutationProps<IComponent, Cs.Entities.IExercise>) => ({
      mark(solutionIds: string[], comments: string[], marks: number[]) {
        return mutate({
          variables: {
            solutionIds,
            comments,
            marks
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

const withPractical = graphql(gql`
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
  {
    name: 'practicalData',
    options: (ownProps: IComponent) => ({
      variables: {
        practicalId: ownProps.params.practicalId,
        userId: ownProps.userId,
      },
    }),
    props: ({ practicalData }: any) => {
      return {
        practical: practicalData.practical
      };
    }
  });

let tid: any = null;

const withSolutions = graphql(gql`
  query markingSolutions($practicalId: String, $semesterId: String, $lastModification: Date, $userId: String) {
    markingSolutions(semesterId: $semesterId, practicalId: $practicalId, lastModification: $lastModification, userId: $userId) {
      ...solutionFragment
    }
  }
`,
  {
    name: 'solutionData',
    options: (ownProps: IComponent) => ({
      fragments: solutionFragment,
      variables: {
        practicalId: ownProps.params.practicalId,
        semesterId: ownProps.params.semesterId,
        userId: ownProps.userId,
        lastModification: ownProps.selectedDate
      }
    }),
    props: ({ solutionData, ownProps }: any) => {
      // in 2 seconds fetch more data
      if (solutionData.fetchMore) {
        if (tid) {
          clearTimeout(tid);
        }
        tid = setTimeout(() => {
          solutionData.fetchMore({
            // fetch 10 more items starting from new offset
            // limit and id variables are the same
            variables: {
              practicalId: ownProps.params.practicalId,
              semesterId: ownProps.params.semesterId,
              userId: ownProps.userId,
              lastModification: getLastModification()
            },
            // tell Apollo Client how to merge the new results of the query
            updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
              const prevSolutions = previousResult.markingSolutions;
              const newSolutions = fetchMoreResult.data.markingSolutions;

              if (newSolutions.length === 0) {
                return previousResult;
              }
              const eliminateDuplicates = (s: Cs.Entities.ISolution) => !newSolutions.find((r: Cs.Entities.ISolution) => r._id === s._id);
              let outputSolutions = prevSolutions.filter(eliminateDuplicates).concat(newSolutions);

              const newResult = { markingSolutions: outputSolutions };

              // browse new solutions and merge possible results

              console.log('Fetched results: ' + newResult.markingSolutions.length);

              // now browse 
              return newResult;
            }
          });
        }, 5000);
      }

      return {
        solutions: solutionData.markingSolutions
      };
    }
  });

const MarkingWithSolutions = withSolutions(MarkingView);
const MarkingWithMutation = withMutation(MarkingWithSolutions);
const MarkingWithPractical = withPractical(MarkingWithMutation);


export default connect(mapStateToProps, mapDispatchToProps)(MarkingWithPractical);
