import { Injectable } from '@angular/core';
import {CoreService} from '../../core/core.service';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class IntraTvsService extends CoreService {

  constructor(public http: HttpClient, public configService: ConfigService, public toasterService: ToasterService) {
    super('intra-tvs', http, configService, toasterService);
  }

}
