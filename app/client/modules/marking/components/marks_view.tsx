import * as React from 'react';
import { List, ListItem, Header2, Header3, Link, Segment, Table } from 'semanticui-react';
import Loading from '../../core/components/loading_view';

export interface IContainerProps {
  params: {
    semesterId: string;
  }
}

export interface IComponent {
  marks: string[];
}


let markRow: string;
let mark: string;

export const MarksView = ({ marks }: IComponent) => {
  if (!marks) {
    return <Loading />;
  }

 return (
  <Segment>
    <Header2 dividing text="Marks" icon="rule" />
    <table className="ui selectable celled table">
      <tbody>
        <For each="markRow" of={marks} index="index">
          <tr>
            <For each="mark" of={markRow.split(',')} index="index">
              <td>{mark}</td>
            </For>
          </tr>
        </For>
      </tbody>
    </table>

  </Segment>
)}

export default MarksView;
