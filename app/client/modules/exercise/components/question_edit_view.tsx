import * as React from 'react';
import { Grid, Column, Segment, Divider, Form, Accordion, AccordionItem } from 'semanticui-react';

import { TextArea, Input, Markdown } from 'redux-form-semantic-ui';
import jss from 'jss';

interface IContainerProps { }
interface IComponentProps {
  question: Cs.Entities.IQuestion;
  formPath: string;
  index: number;
}

interface IComponentActions { }
interface IComponent extends IContainerProps, IComponentProps, IComponentActions { }

let possibility: Cs.Entities.IQuestionPossibility;

const { classes } = jss.createStyleSheet({
  accordion: {
    '& .column': {
      'padding-top': '3px!important',
      'padding-bottom': '3px!important'
    },
    '& .column:last': {
      'padding-bottom': '12px!important'
    }
  }
}).attach();

const QuestionEditView = ({formPath, question, index}: IComponent) => {
  return (
    <div>
      <Markdown name={`${formPath}.description`} label="Description" defaultValue={question ? question.description : ''} />
      <Input name={`${formPath}.question`} label="Question" />
      <Input name={`${formPath}.expectedAnswer`} label="Expected Answer" />
      {/*<TextArea defaultValue={question.validation} label="Validation" rows={2} onChange={bind(`questions.${index}.validation`)} />*/}
      {/*<Dropdown id={question._id + '_control'} activation="click" value={question.control} defaultText={question.control} onChange={bind(`questions.${index}.control`)}>
        <DropdownItem text="Input" value="input" />
        <DropdownItem text="Textarea" value="textbox" />
      </Dropdown>*/}
      <Input name={`${formPath}.control`} label="Control" />
      {/*<Input defaultValue={question.points} label="Points" onChange={bind(`questions.${index}.points`)} />*/}

      <If condition={question && question.possibilities}>
        <Divider />
        <Segment inverted>
          <Accordion id={'Possibilities_' + question._id} classes={`inverted ${classes.accordion}`}>
            <AccordionItem title="Possibilities" >
              <Grid columns={2}>
                <Column><b>Question</b></Column>
                <Column><b>Answer</b></Column>
                <For each="possibility" of={question.possibilities} index="index">
                  <Column>{possibility.question}</Column>
                  <Column>{possibility.answer}</Column>
                </For>
              </Grid>
            </AccordionItem>
          </Accordion>
        </Segment>
      </If>
    </div>
  );
};

export default QuestionEditView;
