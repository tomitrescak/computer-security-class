import * as React from 'react';
import { List, ListItem, Header2, Header3, Segment, Link, Button, Label } from 'semanticui-react';
import { markCalculator } from '../../helpers/app_helpers';

export interface IContainerProps {
  params: {
    name: string,
    practicalId: string,
    semesterId: string
  }
}

export interface IComponentProps {
  user: Cs.User;
  userId: string;
  context: Cs.IContext,
  practicalData?: {
    practical: Cs.Entities.IPractical
  },
  solutionsData?: {
    practicalSolutions: Cs.Entities.ISolution[]
  }
}
interface IComponentActions { }
export interface IComponent extends IContainerProps, IComponentProps, IComponentActions { }

let exercise: Cs.Entities.IExercise;
let index: number;

const Practicals = ({ practicalData: { practical }, solutionsData: { practicalSolutions }, context, params, user}: IComponent) => {
  const calculator = markCalculator(practical);
  let mark: number = null;
  if (practicalSolutions && practicalSolutions.length) {
    mark = calculator(practicalSolutions);
  }
  return (
    <Segment>
      <Choose>
        <When condition={user && practical}>
          <div>
            <If condition={user && user.isRole('tutor')}>
              <Button floated="right" text="Marking" icon="legal" labeled="left" url={`/marking/practical/${context.Utils.Router.encodeUrlName(practical.name)}/${params.practicalId}/${params.semesterId}`} />
            </If>
            <Header2 dividing icon="edit">Practical: {practical.name}<If condition={mark != null}><Label color="blue">Mark: {mark}</Label></If></Header2>
            <p>
              {practical.description}
            </p>
            <List divided>
              <For each="exercise" of={practical.exercises.sort((a, b) => a.name > b.name ? 1 : -1)} index="index">
                <ListItem key={index}>
                  <Header3><Link link={`/exercise/${context.Utils.Router.encodeUrlName(exercise.name)}/${exercise._id}/${params.practicalId}/${params.semesterId}`} text={exercise.name} /></Header3>
                </ListItem>
              </For>
            </List>
          </div>
        </When>
        <Otherwise>User Logged Out</Otherwise>
      </Choose>
    </Segment>
  )
};

export default Practicals;