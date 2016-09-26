import * as React from 'react';
import { List, ListItem, Header2, Header3, Link, Segment, Button } from 'semanticui-react';

interface IContainerProps { }
interface IComponentProps {
  context: Cs.IContext;
  practicals: Cs.Entities.IPractical[];
  semesterId: string;
  user: Cs.Accounts.SystemUser;
}
interface IComponentActions { }
interface IComponent extends IContainerProps, IComponentProps, IComponentActions { }

let practical: Cs.Entities.IPractical;
let index: number;

const PracticalListView = ({ practicals, context, semesterId, user }: IComponent) => {
  return (
    <Segment>
      <If condition={user && user.isRole('tutor')}>
        <Button floated="right" text="Marks" icon="legal" labeled="left" url={`/marks/semester/${semesterId}`} />
      </If>
      <Header2 dividing text="Practicals" icon="edit" />
      <List divided>
        <For each="practical" of={practicals} index="index">
          <ListItem key={index}>
            <Header3><Link link={`practical/${context.Utils.Router.encodeUrlName(practical.name)}/${practical._id}/${semesterId}`} text={practical.name} /></Header3>
            <p>{practical.description}</p>
          </ListItem>
        </For>
      </List>
    </Segment>
  );
};

export default PracticalListView;
