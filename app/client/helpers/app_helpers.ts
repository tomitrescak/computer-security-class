export function markCalculator(practical: Cs.Entities.IPractical): (sols: Cs.Entities.ISolution[]) => number {
  const groups: { [name: string] : { total: number, current: number } } = {};
  const exercises: { [id: string] : string } = {};

  let groupCount = 0;
  practical.exercises.forEach((e) => { 
    let groupName = e.group ? e.group : 'NO__NAME';
    let group = groups[groupName];
    if (!group) {
      group = { total: 0, current: 0 };
      groups[groupName] = group;
      groupCount++;
    }
    group.total += e.questions.length;

    // remember also exercise
    exercises[e._id] = groupName;
  });
  const percentile = 100 / groupCount;

  return function(solutions: Cs.Entities.ISolution[]): number {
    // nullify
    for (let idx in groups) {
      groups[idx].current = 0;
    }

    // calculate current
    for (let sol of solutions) {
      groups[exercises[sol.exerciseId]].current += sol.mark ? (sol.mark / 100) : 0;
    }

    let result = 0;
    for (let idx in groups) {
      let group = groups[idx];
      result += percentile * (group.current / group.total);
    }

    return Math.round(result/10);
  }
}