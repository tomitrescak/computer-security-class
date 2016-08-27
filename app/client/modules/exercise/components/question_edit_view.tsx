import * as React from 'react';
import { Grid, Column, Segment, Input, Button, Divider, Label, TextArea, Form, Accordion, AccordionItem, Dropdown, DropdownItem } from 'semanticui-react';
import jss from 'jss';

interface IContainerProps { }
interface IComponentProps {
  question: Cs.Entities.IQuestion;
  bind: Function;
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

const QuestionEditView = ({question, bind, index}: IComponent) => {
  return (
    <Form>
      <TextArea defaultValue={question.description} previewMarkdown={true} label="Description" onChange={bind(`questions.${index}.description`)} />
      <Input defaultValue={question.question} label="Question" onChange={bind(`questions.${index}.question`)} />
      <Input defaultValue={question.expectedAnswer} label="Expected Answer" onChange={bind(`questions.${index}.expectedAnswer`)} />
      {/*<TextArea defaultValue={question.validation} label="Validation" rows={2} onChange={bind(`questions.${index}.validation`)} />*/}
      {/*<Dropdown id={question._id + '_control'} activation="click" value={question.control} defaultText={question.control} onChange={bind(`questions.${index}.control`)}>
        <DropdownItem text="Input" value="input" />
        <DropdownItem text="Textarea" value="textbox" />
      </Dropdown>*/}
      <Input defaultValue={question.control} label="Control" onChange={bind(`questions.${index}.control`)} />
      {/*<Input defaultValue={question.points} label="Points" onChange={bind(`questions.${index}.points`)} />*/}

      <If condition={question.possibilities}>
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
    </Form>
  )
};

export default QuestionEditView;
