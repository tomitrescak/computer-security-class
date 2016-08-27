import * as React from 'react';
import { Input, Divider, Label, Message } from 'semanticui-react';
import MarkdownView from '../../core/containers/markdown_container';
import jss from 'jss';

import * as SolutionActions from '../actions/solution_actions';

export interface IContainerProps {
  solutionId: string;
  question: Cs.Entities.IQuestion;
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

const SolutionView = ({ context, question, solution}: IComponent) => {
  const bind = context.Utils.Binding(SolutionActions.UPDATE, 'solutions.' + solution._id);
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
            <textarea readOnly={solution.finished} className={classes.textbox} rows="3" placeholder={questionText} defaultValue={solution.userAnswer} onChange={bind('userAnswer')}></textarea>
          </When>
          <Otherwise>
            <Input readOnly={solution.finished} defaultValue={solution.userAnswer} placeholder={questionText} onChange={bind('userAnswer')} />
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
