declare module 'redux-form' {
  export let reduxForm: any;
  export let reducer: any;
  export let Field: any;
  export let Fields: any;
  export let FieldArray: any;
  export let getFormValues: any;
  export let formValueSelector: any;

  export interface ReduxFormInput {
    checked?: boolean;
    name?: string;
    onBlur?: (value: any) => void;
    onChange?: (value: any) => void;
    onDragStart?: (event: any) => void;
    onDrop?: (event: any) => void;
    onFocus?: (event: any) => void;
    value?: any;
  }

  export interface ReduxFormMeta {
    active: boolean;
    autofilled: boolean;
    asyncValidating: boolean;
    dirty: boolean;
    dispatch: Function;
    error: string;
    invalid: boolean;
    pristine: boolean;
    submitting: boolean;
    touched: boolean;
    valid: boolean;
    visited: boolean;
  }
}