import {ClosingReason} from '../../closing-reasons/closing-reason/closing-reason';
import {Service} from '../../services/service/service';
import {Teller} from '../../tellers/teller/teller';
import {RedirectReason} from '../../redirect-reasons/redirect-reason/redirect-reason';
import {User} from '../../users/user/user';
import {Branch} from '../../branches/branch/branch';
import {Entry} from '../../entries/entry/entry';

export class Ticket {
  closingReason: ClosingReason;
  createDate: Date;
  id: string;
  redirects: Redirect[];
  service: Service;
  serviceDate: Date;
  servicingDate: Date;
  status: string;
  teller: Teller;
  reference: string;
  branch: Branch;
  serviceRating: string;
  pushSubscription: WebPushSubscription;
  client: User;
  entry: Entry;

  public constructor() {
    this.status = 'WAITING';
  }

}



export class Redirect {
  createDate: Date;
  id: string;
  redirectReason: RedirectReason;
}
export class WebPushSubscription {
  endpoint: string;
  expirationTime: number;
  keys: Keys;

  constructor() {
    this.keys = new Keys();
  }
}

export class Keys {
  auth: string;
  p256dh: string;
}
