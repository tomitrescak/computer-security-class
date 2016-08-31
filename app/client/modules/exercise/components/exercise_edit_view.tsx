import * as React from 'react';
import { Header2, Segment, Button, Divider, Label, Accordion } from 'semanticui-react';
import QuestionEditView from './question_edit_view';
import Loading from '../../core/components/loading_view';
import * as actions from '../actions/exercise_actions';
import { Markdown, Input } from 'redux-form-semantic-ui';
import { Field, FieldMap, FieldArray } from 'redux-form'
import Random from 'meteor-random';

export interface IContainerProps {
  params: {
    name: string,
    exerciseId: string,
    semesterId: string
  }
}
export interface IComponentProps {
  context: Cs.IContext;
  userId: string;
}

export interface IComponent extends IContainerProps, IComponentProps {
  data: {
    exercise: Cs.Entities.IExercise;
    solutions: Cs.Entities.ISolution[];
    refetch: Function;
    loading: boolean;
  }
  initialValues: {
    exercise: Cs.Entities.IExercise
  },
  save: (exerciseId: string) => any;
}


interface IQuestionsProps {
  fields: FieldMap;
  questions: Cs.Entities.IQuestion;
}

const Questions = ({fields, questions}: IQuestionsProps) => (
  <div>
    { 
      fields.map((questionPath, index) => (
        <div key={index}>
          <Header2 text={"Question: " + (index + 1)} attached="top">
            <Button color="red" text="Remove Question" type="button" floated="right" onClick={() => fields.remove(index)} />
          </Header2>
          <Segment attached="bottom">
            <QuestionEditView formPath={questionPath} question={questions[index]} index={index} />
          </Segment>
        </div>
      ))
    }
    <Button style={{marginTop: '12px'}} color="default" text="Insert Question" 
      icon="plus" floated="right" onClick={() => fields.push({ _id: Random.id() })} />
    <div style={{clear: 'both'}}></div>
  </div>
);


const ExerciseView = ({ handleSubmit, context, params, userId, data, save, initialValues: { exercise }}: IComponent) => {

  return (

    <form className="ui form" onSubmit={handleSubmit(save)}>
      <Choose>
        <When condition={!exercise}>
          <Loading />
        </When>
        <Otherwise>
          <Segment>
            <Input label="Name" placeholder="Name" name="exercise.name" />
            <Input label="Group" placeholder="Group" name="exercise.group" />

            <Markdown name="exercise.instructions" label="Instructions" defaultValue={exercise.instructions} />

            <FieldArray name="exercise.questions" component={Questions} questions={exercise.questions} />
          </Segment>

          <Button color="primary" text="Submit" floated="right" type="submit" onClick={() => {
            
          }
          } />
        </Otherwise>
      </Choose>
    </form>
  )
};


export default ExerciseView;