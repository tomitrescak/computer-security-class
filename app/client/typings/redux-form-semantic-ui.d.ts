// import { ReduxFormInput, ReduxFormMeta } from 'redux-form';

declare module 'redux-form-semantic-ui' {
  import { ReduxFormInput, ReduxFormMeta } from 'redux-form';

  interface ITextArea {
    classes?: string;
    placeholder?: string;
    label?: string;
    rows?: number;
    cols?: number;
    inline?: boolean;
    name?: string;
    readOnly?: boolean;
    input?: ReduxFormInput;
    meta?: ReduxFormMeta;
  }

  export class TextArea extends React.Component<ITextArea, {}> { }

  interface IMarkdown extends ITextArea {
    defaultValue: string;
  }

  export class Markdown extends React.Component<IMarkdown, {}> { }

  interface IInput {
    classes?: string;
    placeholder?: string;
    label?: string;
    icon?: string;
    iconPosition?: string;
    children?: any;
    inputClasses?: string;
    type?: string;
    leftLabel?: string;
    rightLabel?: string;
    inline?: boolean;
    search?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    name?: string;
    input?: ReduxFormInput;
    meta?: ReduxFormMeta;
  }

  export class Input extends React.Component<IInput, {}> { }
}