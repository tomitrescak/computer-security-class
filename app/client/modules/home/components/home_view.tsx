import * as React from 'react';
import Helmet from 'react-helmet';

import { Grid, Column } from 'semanticui-react';

import jss from 'jss';

import { AccountsView } from 'apollo-authentication-semantic-ui';
import PracticalView from '../../practicals/practical_list_view';

// styles

const { classes } = jss.createStyleSheet({
  container: {
    'padding-bottom': '5rem',
    '& .information': {
      margin: '5em 1em 1em 0em'
    },
    '& .homeImage': {
      'overflow': 'hidden'
    },
    '& h1': {
      'font-size': '3em!important',
      'margin-bottom': '1em!important'
    },
    '& .loginContainer': {
      'margin-top': '60px'
    }
  }
}).attach();

// component

interface IProps extends Cs.Accounts.IAuthContainerProps {
  context: Cs.IContext;
  data: {
    semesters: Cs.Entities.ISemester[]
  };
}

const Home = ({ user, data, context }: IProps) => (
  <div className={classes.container}>
    <Helmet title="Home" />
    <If condition={user}>
      <div>
        {/* LOGGED IN */}
        <If condition={data.semesters}>
          <Choose>
            <When condition={data.semesters.length > 1}>
              Many semesters ...
            </When>
            <Otherwise>
              <PracticalView context={context} semesterId={data.semesters[0]._id} practicals={data.semesters[0].practicals} user={user} />
            </Otherwise>
          </Choose>
        </If>
      </div>
      <Else />
      <Grid stackable columns={2}>
        <Column width={6} classes="computer only tablet only homeImage">
          <img src="hacker.png" />
        </Column>
        <Column width={10}>
          <div className="loginContainer">
            <AccountsView />
          </div>
        </Column>
      </Grid>
    </If>
  </div>
);

export default Home;
