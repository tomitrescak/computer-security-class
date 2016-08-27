declare namespace Cs.Entities {
  interface IPractical {
    _id?: string;
    name: string;
    description: string;
    exercises: IExercise[];
  }
}
