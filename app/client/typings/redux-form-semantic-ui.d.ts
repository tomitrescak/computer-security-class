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
}