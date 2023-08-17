import {Teller} from '../../tellers/teller/teller';
import {Branch} from '../../branches/branch/branch';

export class User {
  branch: Branch;
  createDate: Date;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password: string;
  role: string;
  teller: Teller;
  username: string;
  idNumber: string;
  contactNumber: string;
}
