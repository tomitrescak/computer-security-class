//import { useDeps, composeAll } from 'mantra-core';
import Layout from '../components/main_layout';
import { connect } from 'apollo-mantra';

const mapStateToProps = (context: Cs.IContext, state: Cs.IState) => ({
  context: context,
  user: state.accounts.user,
  loggingIn: state.accounts.loggingIn
});

const depsToPropsMapper = (context: Cs.IContext) => ({
  context: context,
  store: context.Store,
});

// export const MainLayout = composeAll(
//   connect(mapStateToProps),
//   useDeps(depsToPropsMapper)
// )(Layout);

export default connect({mapStateToProps})(Layout);
