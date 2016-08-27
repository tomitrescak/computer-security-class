declare namespace Cs.Entities {
  interface ISemester {
    _id?: string;
    name: string;
    practicals: Cs.Entities.IPractical[];
  }
}