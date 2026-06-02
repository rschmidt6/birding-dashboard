export interface ChecklistObservation {
  speciesCode: string;
  howManyAtleast: number;
  howManyAtmost: number;
  howManyStr: string;
  obsId: string;
  present: boolean;
}
