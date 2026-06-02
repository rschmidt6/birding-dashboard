import { ChecklistObservation } from './checklist-observation.model';

export interface Checklist {
  projId: string;
  subId: string;
  protocolId: string;
  locId: string;
  durationHrs: number;
  allObsReported: boolean;
  creationDt: string;
  lastEditedDt: string;
  obsDt: string;
  obsTimeValid: boolean;
  checklistId: string;
  numObservers: number;
  effortDistanceEnteredUnit: string;
  subnational1Code: string;
  submissionMethodCode: string;
  submissionMethodVersion: string;
  deleteTrack: boolean;
  userDisplayName: string;
  numSpecies: number;
  submissionMethodVersionDisp: string;
  obs: ChecklistObservation[];
}
