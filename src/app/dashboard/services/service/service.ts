import {Branch} from '../../branches/branch/branch';
import {OnlineService} from '../../online-services/online-service/online-service';

export class Service {

  branch: Branch;
  description: string;
  id: string;
  name: string;
  font: number;
  minimum: number;
  onlineService: OnlineService;
}
