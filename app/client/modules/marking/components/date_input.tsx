import * as React from 'react';
import { Input } from 'semanticui-react';

export default class DateInput extends React.Component<any, {}> {

  render() {
    return (
      <Input {...this.props} />
    );
  }

  componentDidMount() {
    $(`.input input`).pickadate({
      formatSubmit: 'dd/mm/yyyy', format: 'dd/mm/yyyy',
      onSet: (context: { select: number }) => {
        if (context.select) {
          this.props.changeDate(context.select);
        }
      }
    });
  }
}