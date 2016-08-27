import * as React from 'react';
import { Text } from 'semanticui-react';
import jss from 'jss';

interface ILoadingParams {
  what?: string;
}

export class EmptyLoading extends React.Component<ILoadingParams, {}> {
  render() {
    return (
      <span></span>
    );
  }
}

interface ICenteredProps {
  text?: string;
}

let { classes } = jss.createStyleSheet({
  content: {
    top: '50%',
    width: '300px',
    position: 'absolute',
    left: '50%',
    'margin-left': '-150px'
  }
}).attach();

export const CenteredLoading = ({ text }: ICenteredProps) => (
  <div id="editorLoader" className={classes.content}>
    <div className="ui segment">
      <div className="ui active small inline loader"></div>&nbsp; &nbsp; &nbsp; <Text text={text ? text : 'loading'} />
    </div>
  </div>
);

interface ILoadingProps {
  what?: string;
  error?: Error;
}

const Loading = ({error, what }: any) => (
  <span>
    <div className="ui active small inline loader"></div>&nbsp; &nbsp; &nbsp; <Text text={what ? what : 'Loading ...'} />
    { error && console.error(error) }
  </span>
);

Loading['displayName'] = 'Loading';

export default Loading;


// export default new Loading();

// export default function ComposeLoading(what: string) {
//   return () => <Loading what={what} />;
// }
