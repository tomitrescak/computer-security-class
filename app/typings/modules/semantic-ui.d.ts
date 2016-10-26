interface JQuery {
  form(formDefinition: any, options: any): any;
  dropdown(...params: any[]): void;
  transition(name: string, duration: number, callback?: () => void): any;
  sticky(options: any): any;
  search(options: Object): any;
  modal(text: any): JQuery;
  tab(): any;
  checkbox(): any;
  popup(): any;
  sidebar(...params: any[]): any;
}

interface JQueryStatic {
  semanticUiGrowl(text: string, params?: Object): any;
}