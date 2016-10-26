interface I18n {
  languages: Object;
  currentLanguage: string;
  add(language: string, strings: Object): void;
  initTranslator(prefix: string): void;
  translate(key: string, args?: any): string;
}

declare module 'i18n-client' {
  export var i18n: I18n;
  export function __(key: string, args?: any): string;
}