import * as React from 'react';
import Alert from 'react-s-alert';
import Helmet from 'react-helmet';

import HeaderView from '../../core/components/header_view';
import AuthContainer from '../../core/containers/auth_container';
import Loading from '../../core/components/loading_view';
import { Segment, Grid, Column } from 'semanticui-react';
import jss from 'jss';

const Header = AuthContainer(HeaderView);

// styles

const { classes } = jss.createStyleSheet({
  content: {
  },
  masthead: {
    margin: '0em',
    padding: '1rem 0rem',
    'border-radius': '0!important'
  }
}).attach();

// component

interface IProps {
  content: any;
  context: Cs.IContext;
  loggingIn: boolean;
}

export class Layout extends React.Component<IProps, {}> {
  render() {
    return (
      <main id="home" >
        <div id="content" className={classes.padding}>
          <Helmet
            titleTemplate="Computer Security / %s"
            />

          <div className={'masthead ' + classes.masthead}>
            <Grid page>
              <Column>
                <Header />
                <If condition={this.props.loggingIn}>
                  <Loading what="Logging in ..." />
                <Else />
                  <div id="main">
                    { this.props.children }
                  </div>
                </If>
              </Column>
            </Grid>
          </div>
        </div>
        <Alert />
      </main>
    );
  }

  componentWillMount() {
    // this.props.context.Utils.Ui.pageTransition();
  }

  componentWillUpdate() {
    // this.props.context.Utils.Ui.pageTransition();
  }
};


export default Layout;
