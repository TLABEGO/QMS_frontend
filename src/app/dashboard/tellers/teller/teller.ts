import {Service} from '../../services/service/service';
import {WebPushSubscription} from '../../tickets/ticket/ticket';
import {Branch} from '../../branches/branch/branch';

export class Teller {
  branch: Branch;
  createDate: Date;
  description: string;
  id: string;
  name: string;
  service: Service;
  pushSubscription: WebPushSubscription;
}
