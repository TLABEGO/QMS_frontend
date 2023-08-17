import {Service} from '../../services/service/service';
import {Branch} from '../../branches/branch/branch';

export class Queue {
  branch: Branch;
  createDate: Date;
  id: string;
  max: number;
  name: string;
  service: Service;
}
