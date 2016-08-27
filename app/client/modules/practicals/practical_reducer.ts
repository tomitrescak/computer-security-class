import { getQuery, copyQuery } from 'apollo-mantra';

export interface IPracticalState {
  practicals: {
    [id: string]: Cs.Entities.IPractical
  };
}


export default function reducer(state: IPracticalState = { practicals: {}}, action: any) {
  Object.assign
  // take care of query copies
  switch (getQuery(action)) {
    case 'practical':
      return copyQuery(state, 'practicals', action.result.data.practical);
  }
  return state;
}
