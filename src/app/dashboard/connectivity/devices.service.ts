import {Injectable} from '@angular/core';
import {CoreService} from '../../core/core.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class DevicesService extends CoreService {

  constructor(public http: HttpClient, public configService: ConfigService, public toasterService: ToasterService) {
    super('connectivity', http, configService, toasterService);
  }

  public getPing(deviceId: string, branchId: string, report: string) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('deviceId', deviceId);
    httpParams = httpParams.set('branchId', branchId);
    httpParams = httpParams.set('type', 'Tv');
    httpParams = httpParams.set('report', report);
    const url = this.configService.getApi() + this.type + '/ping';
    return this.http.get(url, {params: httpParams, responseType: 'text'});
  }


}
