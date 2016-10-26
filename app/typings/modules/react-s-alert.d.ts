declare module 'react-s-alert' {
  export default class SAlertStatic extends React.Component<{}, {}> {
    static success(message: string, options?: Object): void;
    static info(message: string, options?: Object): void;
    static error(message: string, options?: Object): void;
    static config(config: Object): void;
  }

  // let Alert: SAlertStatic;
  // export default Alert;
}