import * as React from 'react';
import { Header5, TextArea, Button, Segment, Message } from 'semanticui-react';
import * as actions from '../actions/marking_actions';
import Loading from '../../core/components/loading_view';

export interface IContainerProps {
  context: Cs.IContext;
  solution: Cs.Entities.ISolution;
  question: Cs.Entities.IQuestion;
}

export interface IComponentProps {
  stored: Cs.Entities.ISolution;
}

interface IComponent extends IComponentProps, IContainerProps { }

const MarkingQuestionView = ({ context, solution, question, stored }: IComponent) => {
  const bind = context.Utils.Binding(actions.UPDATE, 'current.' + solution._id);

  const expectedAnswer = solution.expectedAnswer ? solution.expectedAnswer : question.expectedAnswer;
  let mark: HTMLInputElement;
  const markBind = bind('mark');
  const eventSource: any = {
    currentTarget: mark
  };

  if (!stored) {
    return <Loading what="Loading solution ..." />;
  }

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
      <TextArea rows={2} label="Comment" onChange={bind('tutorComment')} value={stored.tutorComment ? stored.tutorComment : ''} />
      <div className="ui action labeled input">
        <div className="ui label">%</div>
        <input style={{ width: '80px' }} ref={(node) => { mark = node; eventSource.currentTarget = node; } } type="number" placeholder={`Mark`} value={stored.mark || stored.mark === 0 ? stored.mark : ''} onChange={markBind} />
        <Button color="green" text="Good" onClick={() => { mark.value = '100'; markBind(eventSource); } } />
        <Button color="orange" text="Kinda" onClick={() => { mark.value = '50'; markBind(eventSource); } } />
        <Button color="red" text="Bad" onClick={() => { mark.value = '0'; markBind(eventSource); } } />
      </div>


    </Segment>
  );
};

export default MarkingQuestionView;
