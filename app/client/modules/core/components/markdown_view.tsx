import * as React from 'react';

export interface IComponentProps {
  html: string;
}

export default class Markdown extends React.Component<IComponentProps, {}> {
  render() {
    return <span dangerouslySetInnerHTML={{ __html: this.props.html }}/>;
  }
}