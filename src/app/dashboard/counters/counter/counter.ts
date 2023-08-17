import {Service} from '../../services/service/service';
import {Branch} from '../../branches/branch/branch';

export class Counter {
  branch: Branch;
  id: string;
  name: string;
  service: Service;
}
