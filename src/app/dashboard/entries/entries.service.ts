import { Injectable } from '@angular/core';
import {CoreService} from '../../core/core.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {Entry} from './entry/entry';
import {ReportForm} from '../report/report.form';

@Injectable({
  providedIn: 'root'
})
export class EntriesService extends CoreService {

  constructor(public http: HttpClient, public configService: ConfigService, public toasterService: ToasterService) {
    super('entries', http, configService, toasterService);
  }

  public checkFlagged(entry: Entry) {

    const url = this.configService.getApi() + this.type + '/flagged';
    return this.http.put(url, entry);

  }


  public statusCount(reportForm: ReportForm) {

    const url = this.configService.getApi() + this.type + '/flagged/count';
    return this.http.post(url, reportForm);

  }

  public searchByBranch(page: number, perPage: number, sortOrder: string, sortField: string, keyword: string, branchId: string) {

    if (keyword === undefined) {
      keyword = '';
    }
    let httpParams = new HttpParams();
    httpParams = httpParams.set('keyword', keyword);
    const url = this.configService.getApi() + this.type + '/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField + '/' + branchId;
    return this.http.get(url, {params: httpParams});

  }

  public download() {

    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Accept', 'application/vnd.ms-excel');
    const url = this.configService.getApi() + this.type + '/download';
    return this.http.get(url, {headers: httpHeaders, responseType: 'blob'});

  }
}
