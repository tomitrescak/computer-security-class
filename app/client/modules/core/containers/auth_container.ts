import { connect } from 'react-redux';

function noRole() { return false; }

declare global {
  namespace Cs.Accounts {
    interface IAuthContainerProps {
      user: SystemUser;
      isAdmin: boolean;
      isRole: (role: string|string[]) => boolean;
      loggingIn: boolean;
    }
  }
}

const mapStateToProps = (state: Cs.IState) => ({
  user: state.accounts.user,
  isAdmin: state.accounts.user ? state.accounts.user.isAdmin() : false,
  isRole: state.accounts.user ? state.accounts.user.isRole : noRole,
  loggingIn: state.accounts.loggingIn
});

export default (component: any) => connect(mapStateToProps)(component);