import * as React from 'react';
import { Input, IInput } from 'semanticui-react';

interface IProps extends IInput {
  changeDate: (date: number) => void;
}

export default class DateInput extends React.Component<IProps, {}> {

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