declare module 'storybook-addon-specifications' {
  export function specs(): void;
  export function describe(name: string, imp: Function): void;
  export function it(name: string, imp: Function): void;
  export function xit(name: string, imp: Function): void;
}

interface IStory {
  /**
   * Add a new story
   *
   * @param {string} name
   * @param {Function} impl Implementation fo the story
   * @returns {IStory}
   */
  add(name: string, impl: Function): IStory;

  /**
   * Adds a new story with a description
   *
   * @param {string} name
   * @param {string} description
   * @param {Function} impl Implementation fo the story
   * @returns {IStory}
   */
  addWithInfo(name: string, description: string, impl: Function): IStory;
  addDecorator(children: any): IStory;
}

declare function storiesOf(name: string, imp: Function | any): IStory;
declare function specs(impl: Function): void;
declare function action(name: string): any; 
