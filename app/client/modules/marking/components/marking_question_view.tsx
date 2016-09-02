import * as React from 'react';
import { Header5, Button, Segment, Message } from 'semanticui-react';
import * as actions from '../actions/marking_actions';
import Loading from '../../core/components/loading_view';

import { TextArea, Input } from 'redux-form-semantic-ui';
import { Field } from 'redux-form';


export interface IComponentProps {
  context: Cs.IContext;
  solution: Cs.Entities.ISolution;
  question: Cs.Entities.IQuestion;
  name: string;
}

interface IComponent extends IComponentProps { }

const MarkEditor = ({input: { value, onChange }}: any) => (
  <div className="ui action labeled input">
    <div className="ui label">%</div>
    <input style={{ width: '80px' }} type="number" placeholder={`Mark`} value={value} readOnly  />
    <Button color="green" text="Good" onClick={() => { onChange('100'); }} />
    <Button color="orange" text="Kinda" onClick={() => { onChange('50'); } } />
    <Button color="red" text="Bad" onClick={() => { onChange('0'); } } />
  </div>
)

const MarkingQuestionView = ({ context, solution, question, name }: IComponent) => {

  const expectedAnswer = solution.expectedAnswer ? solution.expectedAnswer : question.expectedAnswer;
  let mark: HTMLInputElement;
  const eventSource: any = {
    currentTarget: mark
  };

  let color: any = 'blue';
  if (expectedAnswer && new RegExp(expectedAnswer).exec(solution.userAnswer)) {
    color = 'green';
  }

  return (
    <Segment>
      <Header5>Question: {solution.userQuestion ? solution.userQuestion : question.question}</Header5>
      <div style={{ margin: '12px 0px' }}>
        <Choose>
          <When condition={solution.userAnswer}>
            <Choose>
              <When condition={expectedAnswer}>
                <Message color={color}>{solution.userAnswer}</Message>
              </When>
              <Otherwise>
                {solution.userAnswer}
              </Otherwise>
            </Choose>

          </When>
          <Otherwise><Message color="red">No answer</Message></Otherwise>
        </Choose>
      </div>
      <If condition={expectedAnswer}>
        Expected Answer:
        <Message color="grey">{expectedAnswer}</Message>
      </If>
      <TextArea rows={2} label="Comment" name={`${name}.tutorComment`}  />
      <Field component={MarkEditor} name={`${name}.mark`} />
    </Segment>
  );
};

export default MarkingQuestionView;
