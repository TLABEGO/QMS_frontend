import {Image} from '../../../core/image';
import {Branch} from '../../branches/branch/branch';

export class DisplayInformation {
  branch: Branch;
  createDate: Date;
  id: string;
  longDescription: string;
  schedule: string;
  shortDescription: string;
  zuluLongDescription: string;
  attachment: Image;
  status: string;
}
