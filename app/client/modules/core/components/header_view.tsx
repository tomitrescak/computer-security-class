import * as React from 'react';

import { UserView } from 'apollo-authentication-semantic-ui';
import { Menu, MenuItem } from 'semanticui-react';
import jss from 'jss';

const { classes } = jss.createStyleSheet({
  header: {
    'margin-top': '30px!important'
  }
}).attach();

export interface IComponentProps extends Cs.Accounts.IAuthContainerProps {
}

export const Header = ({ isAdmin, user }: IComponentProps) => (
  <Menu inverted color="blue" classes={classes.header}>
    <MenuItem classes="header" link="/" icon="bug" text="Computer Security" />
    <Menu position="right">
      <UserView />
    </Menu>
  </Menu>
);

export default Header;
