import Component, { IContainerProps, IComponentProps } from '../components/solution_view';
import { connect } from 'apollo-mantra';

const mapStateToProps = (context: Cs.IContext, state: Cs.IState, ownProps: IContainerProps): IComponentProps => ({
  solution: state.solution.solutions[ownProps.solutionId],
  context
});

// const mapDispatchToProps = (context: Cs.IContext, dispatch: Function, ownProps: IContainerProps): IComponentProps => ({
//   solution: state.solution.solutions[ownProps.solutionId]
// });

export default connect<IContainerProps>(mapStateToProps)(Component);
