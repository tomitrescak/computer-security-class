import * as React from 'react';
import { Header2, Segment } from 'semanticui-react';
import Loading from '../../core/components/loading_view';

export interface IContainerProps {
  params: {
    semesterId: string;
  };
}

export interface IComponent {
  marks: string[];
}


let markRow: string;
let mark: string;
let index: number;

export const MarksView = ({ marks }: IComponent) => {
  if (!marks) {
    return <Loading />;
  }

  const totalMarks = marks[0].split(',').length;

  function renderRow(row: string) {
    let cols: any[] = [];
    let vals = row.split(',');
    for (let i = 0; i < totalMarks; i++) {
      let val = vals[i] || '';
      cols.push(<td key={i}>{val}</td>);
    }
    return cols;
  }

  return (
    <Segment>
      <Header2 dividing text="Marks" icon="rule" />
      <table className="ui selectable celled table">
        <tbody>
          <For each="markRow" of={marks} index="index">
            <tr key={index}>
              {renderRow(markRow)}
            </tr>
          </For>
        </tbody>
      </table>

    </Segment>
  );
};

export default MarksView;
