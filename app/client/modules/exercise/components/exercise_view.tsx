import * as React from 'react';
import { Header2, Segment, Button } from 'semanticui-react';
import MarkdownView from '../../core/containers/markdown_container';
import SolutionView from '../../solution/components/solution_view';
import Loading from '../../core/components/loading_view';
import { FieldArray, Field, getFormValues, formValueSelector } from 'redux-form';

export interface IContainerProps {
  params: {
    name: string,
    exerciseId: string,
    semesterId: string,
    practicalId: string
  };
}
export interface IComponentProps {
  context: Cs.IContext;
  userId: string;
  user: Cs.Accounts.SystemUser;
  exerciseData?: {
    exercise: Cs.Entities.IExercise;
    loading: boolean;
  };
  solutionData?: {
    solutions: Cs.Entities.ISolution[];
    refetch: Function;
    loading: boolean;
  };
}

export interface IComponentMutations {
  answer: (solutionIds: string[], userAnswers: string[], finished: boolean) => any;
}

export interface IComponent extends IContainerProps, IComponentProps, IComponentMutations, Apollo.IComponentMutations<IComponentMutations> {
  initialValues?: {
    solutions: Cs.Entities.ISolution[];
  };
}

interface IQuestionsProps {
  fields: string[];
  questions: Cs.Entities.IQuestion[];
  context: Cs.IContext;
  solutions: Cs.Entities.ISolution[];
}

const QuestionsView = ({fields, questions, context, solutions}: IQuestionsProps) => {
  return (
    <div>
      {
        
        fields.map((solutionName, index) => {
          const solution = solutions[index];
          const question = questions.find((q) => q._id === solution.questionId);

          if (!question) {
            return <div></div>
          }

          return (
            <SolutionView
              key={index}
              formName={solutionName}
              question={question}
              solution={solution}
              solutionId={solution._id}
              context={context}
              />
          )
        }
        )}
    </div>
  )
}

const ExerciseView = ({ context, user, params, userId, exerciseData, initialValues,
  initialValues: { solutions },
  exerciseData: { exercise },
  answer }: IComponent) => {

  // sort question
  // if (exercise && initialValues.solutions) {
  //   initialValues.solutions = initialValues.solutions.sort((a, b) => {
  //     const a1 = exercise.questions.findIndex(q => q._id == a.questionId);
  //     const a2 = exercise.questions.findIndex(q => q._id == b.questionId);
  //     return a1 - a2;
  //   });
  // }

  return (
    <form onSubmit={(e) => { e.preventDefault(); } } name="exerciseForm">
      <Choose>
        <When condition={!user}>
          <Segment>
            User Logged Out
          </Segment>
        </When>
        <When condition={!exercise || !initialValues.solutions}>
          <Loading />
        </When>
        <Otherwise>
          <div>
            <Segment>
              <If condition={user.isRole('tutor')}>
                <Button floated="right" color="orange" text="Modify" icon="edit" labeled="left" url={`/admin/exercise/${context.Utils.Router.encodeUrlName(exercise.name)}/${params.exerciseId}/${params.semesterId}`} />
              </If>
              <Button floated="right" color="default" text="Back to Practical" icon="arrow left" labeled="left" url={`/practical/1/${params.practicalId}/${params.semesterId}`} />
              <Header2 dividing text={`${exercise.name}`} icon="edit" />
              <MarkdownView text={exercise.instructions} />

              <FieldArray name="solutions"
                component={QuestionsView}
                questions={exerciseData.exercise.questions}
                context={context}
                solutions={initialValues.solutions}
                />
            </Segment>

            <If condition={solutions && solutions.length && !solutions[0].finished}>
              <Button color="green" text="Submit to Tutor" floated="right"
                onClick={() => {
                  const values: { solutions: Cs.Entities.ISolution[] } = getFormValues('exerciseForm')(context.Store.getState());
                  const ids = values.solutions.map((s) => s._id);
                  const userAnswers = values.solutions.map((s) => s.userAnswer);
                  answer(ids, userAnswers, true);
                } } />
            </If>

            <If condition={solutions && solutions.length && solutions[0].finished}>
              <Button color="red" text="Unsubmit"
                onClick={() => {
                  const values: { solutions: Cs.Entities.ISolution[] } = getFormValues('exerciseForm')(context.Store.getState());
                  const ids = values.solutions.map((s) => s._id);
                  const userAnswers = values.solutions.map((s) => s.userAnswer);
                  answer(ids, userAnswers, false);
                } } />
            </If>

            <Button color="primary" text="Save" floated="right" labeled="left" icon="save"
              onClick={() => {
                const values: { solutions: Cs.Entities.ISolution[] } = getFormValues('exerciseForm')(context.Store.getState());
                const ids = values.solutions.map((s) => s._id);
                const userAnswers = values.solutions.map((s) => s.userAnswer);
                answer(ids, userAnswers, false);
              } } />
          </div>
        </Otherwise>
      </Choose>
    </form>
  )
};

export default ExerciseView;
