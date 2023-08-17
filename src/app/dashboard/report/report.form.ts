import {Service} from '../services/service/service';
import {Teller} from '../tellers/teller/teller';
import {ClosingReason} from '../closing-reasons/closing-reason/closing-reason';
import {Branch} from '../branches/branch/branch';

export class ReportForm {

  start: string;
  end: string;
  branch: Branch;
  service: Service;
  closingReason: ClosingReason;
  teller: Teller;
  status: string;
  type: string;
}
