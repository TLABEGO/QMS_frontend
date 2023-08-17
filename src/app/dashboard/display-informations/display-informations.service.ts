import {Injectable} from '@angular/core';
import {CoreService} from '../../core/core.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class DisplayInformationsService extends CoreService {

  constructor(public http: HttpClient, public configService: ConfigService, public toasterService: ToasterService) {
    super('display-information', http, configService, toasterService);
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

  public searchByBranchAndStatus(page: number, perPage: number, sortOrder: string, sortField: string, keyword: string, branchId: string, status: string) {

    if (keyword === undefined) {
      keyword = '';
    }
    let httpParams = new HttpParams();
    httpParams = httpParams.set('keyword', keyword);
    const url = this.configService.getApi() + this.type + '/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField + '/' + branchId + '/' + status;
    return this.http.get(url, {params: httpParams});

  }

}

