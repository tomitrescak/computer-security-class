import * as React from 'react';
import { Button, Grid, Column, Items, Item, List, ListItem, Divider, Label, Link, Message } from 'semanticui-react';

import MarkingExerciseView from '../containers/marking_exercise_container';
import Loading from '../../core/components/loading_view';
import jss from 'jss';
import { markCalculator } from '../../../helpers/app_helpers';
import DateInput from './date_input';

const { classes } = jss.createStyleSheet({
  dateInput: {
    width: '110px',
    float: 'right'
  }
}).attach();

export interface IContainerProps {
  params: {
    name: string,
    userId: string,
    exerciseId: string,
    practicalId: string,
    semesterId: string,
  };
}

export interface IComponentProps {
  context: Cs.IContext;
  userId: string;
  showMarked: boolean;
  showPending: boolean;
  selectedDate: Date;
}
export interface IComponentActions {
  toggleMarked: Function;
  togglePending: Function;
  changeDate: (date: number) => void;
}
export interface IComponent extends IContainerProps, IComponentProps, IComponentActions {
  solutions: Cs.Entities.ISolution[];
  practical: Cs.Entities.IPractical;
  mark(solutionIds: string[], comments: string[], marks: number[]): void;
}

let user: Cs.Entities.Group<Cs.Entities.ISolution>;
let index: number;

const MarkingView = ({ context, params, showMarked, showPending, toggleMarked, togglePending, practical, solutions, selectedDate, changeDate, mark  }: IComponent) => {

  if (!practical || !solutions) {
    return <Loading what="Loading practical ..."/>;
  }

  const groupBy = context.Utils.Class.groupByArray;
  // console.log('Render marking ...: ');
  // console.log(solutionData.markingSolutions);
  // filter solution by practical and semester

  const usol = solutions.filter((s) => s.userId === params.userId && s.exerciseId === params.exerciseId);

  return (
    <Grid columns={2}>
      <Column width={10}>
        <Choose>
          <When condition={usol.length}>
            <MarkingExerciseView
              context={context}
              markMutation={mark}
              practical={practical}
              exerciseId={params.exerciseId}
              initialValues={{ userSolutions: usol }} />
          </When>
          <Otherwise>
            <Message>Please select a user exercise</Message>
          </Otherwise>
        </Choose>
        <If condition={params.userId}></If>
      </Column>
      <Column width={6}>
        <div style={{ height: '30px' }}>
          <Button toggle={showMarked ? 'active' : 'inactive'} text="Marked" floated="right" onClick={toggleMarked} />
          <Button toggle={showPending ? 'active' : 'inactive'} text="Pending" floated="right" onClick={togglePending} />
          <DateInput defaultValue={selectedDate['format']('DD/MM/YYYY')} classes={classes.dateInput} placeholder="dd/mm/yyyy" changeDate={changeDate} />
        </div>
        <div style={{ position: 'fixed', top: '135px', bottom: '5px', overflow: 'auto' }}>
          <UsersView context={context}
            practical={practical}
            semesterId={params.semesterId}
            showMarked={showMarked}
            showPending={showPending}
            solutions={solutions}
            userId={params.userId}
            exerciseId={params.exerciseId}
            />
        </div>
      </Column>
    </Grid>
  );
};


interface IUsersView {
  context: Cs.IContext;
  semesterId: string;
  userId: string;
  exerciseId: string;
  showMarked: boolean;
  showPending: boolean;
  practical: Cs.Entities.IPractical;
  solutions: Cs.Entities.ISolution[];
}

class UsersView extends React.Component<IUsersView, {}> {


  render() {
    console.log('Users ...');

    const {context, practical, showMarked, showPending, semesterId, solutions } = this.props;
    const groupBy = context.Utils.Class.groupByArray;

    let markingSolutions = solutions.filter((s) => s.practicalId === practical._id && s.semesterId === semesterId);
    let users = groupBy<Cs.Entities.ISolution>(markingSolutions, 'user');

    // sort by modification date, oldest to newest
    users = users.sort((a, b) => {
      // find max date in a
      let aDate = 0;
      a.values.forEach((av) => aDate = ((av.modified && (aDate < av.modified)) ? av.modified : aDate));
      // find max date in b
      let bDate = 0;
      b.values.forEach((av) => bDate = ((av.modified && (bDate < av.modified)) ? av.modified : bDate));

      return aDate < bDate ? -1 : 1;
    });

    let markCalc = markCalculator(practical);

    return (
      <Items>
        <For each="user" of={users} index="index">
          <ExercisesView userSolutions={user.values}
            key={user.key}
            context={context}
            practical={practical}
            semesterId={semesterId}
            userName={user.key}
            showMarked={showMarked}
            showPending={showPending}
            markCalc={markCalc}
            />
        </For>
      </Items>
    );
  }

  shouldComponentUpdate(nextProps: IUsersView) {
    if (this.props.showMarked !== nextProps.showMarked ||
      this.props.showPending !== nextProps.showPending ||
      this.props.solutions !== nextProps.solutions) {
      return true;
    }
    return false;
  }
}



interface IExercisesView {
  context: Cs.IContext;
  userSolutions: Cs.Entities.ISolution[];
  practical: Cs.Entities.IPractical;
  semesterId: string;
  userName: string;
  showMarked: boolean;
  showPending: boolean;
  markCalc: (solutions: Cs.Entities.ISolution[]) => number;
}

let exercise: Cs.Entities.Group<Cs.Entities.ISolution>;

const ExercisesView = ({userSolutions, userName, context, practical, semesterId, showMarked, showPending, markCalc }: IExercisesView) => {

  let exercises = context.Utils.Class.groupByArray(userSolutions, 'exerciseId');
  if (!showMarked) {
    exercises = exercises.filter((e) => e.values.find((v) => v.mark == null));
  }
  if (!showPending) {
    exercises = exercises.filter((e) => e.values.find((v) => v.finished));
  }
  exercises = exercises.sort((a, b) => {
    const ea = practical.exercises.find((e) => e._id === a.key);
    const eb = practical.exercises.find((e) => e._id === b.key);
    return ea.name < eb.name ? -1 : 1;
  });

  // hide users with no exercises
  if (exercises.length === 0) {
    return <span />;
  }

  let total = markCalc(userSolutions);
  //userSolutions.forEach((s) => total += s.mark ? s.mark : 0);
  //total = Math.round(total / userSolutions.length);
  return (

    <Item.Main>
      <Item.Content>
        <Item.Header>
          <Label color="blue" style={{ marginRight: '12px' }}>{total} Points</Label>
          {userName}
        </Item.Header>
        <Item.Description>
          <List>
            <For each="exercise" of={exercises} index="index">
              <ListItem key={index}>
                <ExerciseView userSolutions={exercise.values} context={context} practical={practical} exerciseId={exercise.key} semesterId={semesterId} />
              </ListItem>
            </For>
          </List>
        </Item.Description>
        <Divider />
      </Item.Content>

    </Item.Main>


  );
};


interface IExerciseView {
  context: Cs.IContext;
  semesterId: string;
  exerciseId: string;
  userSolutions: Cs.Entities.ISolution[];
  practical: Cs.Entities.IPractical;
}

const ExerciseView = ({userSolutions, context, practical, exerciseId, semesterId }: IExerciseView) => {
  const exercise = practical.exercises.find((e) => e._id === exerciseId);
  const finished = userSolutions.filter((s) => s.finished);
  const marked = userSolutions.filter((s) => s.mark != null && s.mark >= 0);
  let total = 0;
  userSolutions.forEach((s) => total += s.mark ? s.mark : 0);
  total = Math.round(total / userSolutions.length);

  return (
    <div>
      <Choose>
        <When condition={marked.length > 0}>
          <Label color="blue">{total}%</Label>
        </When>
        <When condition={finished.length === userSolutions.length}>
          <Label color="green">Finished</Label>
        </When>
        <Otherwise>
          <Label color="orange">Pending</Label>
        </Otherwise>
      </Choose>
      <span style={{ marginLeft: '12px' }}>
        <Link link={`/marking/${context.Utils.Router.encodeUrlName(practical.name)}/${context.Utils.Router.encodeUrlName(userSolutions[0].user)}/${userSolutions[0].userId}/${exerciseId}/${practical._id}/${semesterId}`}>{exercise.name}</Link>
      </span>

    </div>
  );
};

export default MarkingView;
