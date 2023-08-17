import {Service} from '../services/service/service';
import {Branch} from '../branches/branch/branch';

export class StatusCount {
  id: string;
  count: number;
}

export class BranchCount {
  id: Branch;
  count: number;
}

export class ServiceCount {
  id: Service;
  count: number;
}

