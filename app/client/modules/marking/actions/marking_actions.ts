export const TOGGLE_MARKED = 'Marking: Toggle Marked';
export const TOGGLE_PENDING = 'Marking: Toggle Pending';
export const UPDATE = 'Marking: Update';
export const INIT = 'Marking: Init';
export const UPDATE_MARKS = 'Marking: Update MArks';

export function toggleMarked() {
  return {
    type: TOGGLE_MARKED
  };
}

export function togglePending() {
  return {
    type: TOGGLE_PENDING
  }
}

export function initMarking(usol: Cs.Entities.ISolution[]) {
  return {
    type: 'Marking: Init',
    solutions: usol
  };
}

export function updateMarks() {
  return {
    type: UPDATE_MARKS
  };
}
