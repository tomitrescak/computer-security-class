declare module 'jss' {
  interface IJss {
    use(plugin: any): void;
    setup(plugin: any): void;
    createStyleSheet(sheet: any): { attach: () => { classes: any } };
    createAndMount(obj: any): any;
  }
  export function jss (obj: any): any;
  let jss: IJss;
  export default jss;
}

declare module 'jss-nested' {
  export default function(): any;
}

declare module 'jss-vendor-prefixer' {
  export default function(): any;
}

declare module 'jss-preset-default' {
  export default function(): any;
}