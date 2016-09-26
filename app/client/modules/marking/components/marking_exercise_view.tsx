import * as React from 'react';
import { Header2, Button, List, ListItem, Label } from 'semanticui-react';
import * as actions from '../actions/marking_actions';

import MarkingQuestionView from './marking_question_view';

interface IMarkingExerciseView {
  context: Cs.IContext;
  initialValues: { userSolutions: Cs.Entities.ISolution[] };
  practical: Cs.Entities.IPractical;
  exerciseId: string;
  markMutation: Function;
  handleSubmit?: Function;
}

let solution: Cs.Entities.ISolution;
let index: number;

const save = ({ userSolutions}: { userSolutions: Cs.Entities.ISolution[] }, mark: Function, context: Cs.IContext) => {

  const ids: string[] = userSolutions.map((s) => s._id);
  const comments: string[] = userSolutions.map((s) => s.tutorComment);
  const marks: number[] = userSolutions.map((s) => s.mark);

  mark(ids, comments, marks);
} 

function exerciseSort(exercise: Cs.Entities.IExercise) {
  return (a: Cs.Entities.ISolution, b: Cs.Entities.ISolution) => {
    if (!exercise) {
      console.warn('No exercise ...');
      return 0;
    }
    const a1 = exercise.questions.findIndex(q => q._id === a.questionId);
    const a2 = exercise.questions.findIndex(q => q._id === b.questionId);
    return a1 - a2;
  };
}

const MarkingExerciseView = ({ initialValues: { userSolutions }, handleSubmit, context, practical, exerciseId, markMutation }: IMarkingExerciseView) => {
  const exercise = practical.exercises.find((e) => e._id === exerciseId);
  const user = userSolutions[0].user;
  return (
    <form className="ui form" onSubmit={handleSubmit((o: any) => save(o, markMutation, context))} >
      <Header2 text={`${user}: ${exercise.name}`} />
      <Label color="grey">{context.Utils.Ui.relativeDate(new Date(userSolutions[0].modified))}</Label>
      <List>
        <For each="solution" of={userSolutions.sort(exerciseSort(practical.exercises.find(e => e._id === exerciseId)))} index="index">
          <ListItem key={index}>
            <If condition={exercise.questions.find((q) => q._id === solution.questionId)}>
              <MarkingQuestionView name={`userSolutions[${index}]`} context={context} solution={solution} question={exercise.questions.find((q) => q._id === solution.questionId)} />
            </If>
          </ListItem>
        </For>
      </List>
      <Button text="Save Marks" icon="save" labeled="left" type="submit" floated="right" color="primary" />
    </form>
  );
};

export default MarkingExerciseView;