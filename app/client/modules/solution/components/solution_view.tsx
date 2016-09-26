import * as React from 'react';
import { Divider, Label, Message } from 'semanticui-react';
import { TextArea, Input } from 'redux-form-semantic-ui';

import MarkdownView from '../../core/containers/markdown_container';
import jss from 'jss';

export interface IContainerProps {
  solutionId: string;
  question: Cs.Entities.IQuestion;
  formName: string;
}

export interface IComponentProps {
    context: Cs.IContext;
    solution: Cs.Entities.ISolution;
}

interface IComponent extends IContainerProps, IComponentProps { }

const { classes } = jss.createStyleSheet({
  textbox: {
    'margin-bottom': '12px!important'
  }
}).attach();

const SolutionView = ({ context, question, solution, formName }: IComponent) => {
  if (!question) {
    return <span></span>;
  }
  const questionText = solution.userQuestion ? solution.userQuestion : question.question;
  return (
    <div className="ui form">
      <Divider icon="game" orientation="horizontal" />
      <p>
        <MarkdownView text={question.description} />
      </p>
      <div className="field">
        <label>{questionText}</label>
        <Choose>
          <When condition={question.control === 'textarea'}>
            <TextArea name={`${formName}.userAnswer`} readOnly={solution.finished} classes={classes.textbox} rows={3} placeholder={questionText}></TextArea>
          </When>
          <Otherwise>
            <Input name={`${formName}.userAnswer`} readOnly={solution.finished}  placeholder={questionText}  />
          </Otherwise>
        </Choose>

        <If condition={solution.mark != null}>
          <Label color="blue" text={'Mark: ' + solution.mark} />
        </If>
        <If condition={solution.mark == null && solution.finished}>
          <Label color="grey" text="Finished" />
        </If>
        {/*<Choose>
          <When condition={solution.mark != null && solution.mark > 0 && solution.mark < question.points}>
            <Label color="orange" text={'Satisfying Answer'} />
          </When>
          <When condition={solution.mark != null && solution.mark === question.points}>
            <Label color="green" text="Correct" />
          </When>
          <When condition={solution.mark != null && solution.mark === 0}>
            <Label color="red" text="Incorrect" />
          </When>
        </Choose>*/}
        <If condition={solution.tutorComment}>
          <Message color="blue"><b>Tutor comment: </b>{solution.tutorComment}</Message>
        </If>
      </div>
    </div>
  );
};

export default SolutionView;
