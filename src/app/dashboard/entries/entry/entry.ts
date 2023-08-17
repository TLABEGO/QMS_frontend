import {User} from '../../users/user/user';
import {Branch} from '../../branches/branch/branch';

export class Entry {
  branch: Branch;
  contactedInfectedPerson: string;
  createDate: Date;
  diarrhoea: string;
  difficultyBreathing: string;
  feelingHotOrCold: string;
  flagged: boolean;
  generalBodyPains: string;
  id: string;
  lostTasteOrSmell: string;
  preExistingMedicalConditions: string;
  recentCough: string;
  referred: string;
  soreThroat: string;
  temperature: number;
  travelled: string;
  user: User;

  constructor() {
    this.user = new User();
  }
}
