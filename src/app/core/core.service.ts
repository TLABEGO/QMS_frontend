import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConfigService} from './config.service';
import {ToasterService} from 'angular2-toaster';
import {ReportForm} from '../dashboard/report/report.form';

@Injectable()
export abstract class CoreService {


  constructor(public type: string,
              public http: HttpClient,
              public configService: ConfigService,
              public toasterService: ToasterService) {
  }

  public statusCount(reportForm: ReportForm) {

    const url = this.configService.getApi() + this.type + '/status/count';
    return this.http.post(url, reportForm);

  }

  public branchCount(reportForm: ReportForm) {

    const url = this.configService.getApi() + this.type + '/branch/count';
    return this.http.post(url, reportForm);

  }

  public serviceCount(reportForm: ReportForm) {

    const url = this.configService.getApi() + this.type + '/service/count';
    return this.http.post(url, reportForm);

  }

  public branchReport(reportForm: ReportForm) {

    const url = this.configService.getApi() + this.type + '/branch-report';
    return this.http.post(url, reportForm);

  }

  public report(reportForm: ReportForm) {

    const url = this.configService.getApi() + this.type + '/report';
    return this.http.post(url, reportForm);

  }

  public search(page: number, perPage: number, sortOrder: string, sortField: string, keyword: string) {

    if (keyword === undefined) {
      keyword = '';
    }
    let httpParams = new HttpParams();
    httpParams = httpParams.set('keyword', keyword);
    const url = this.configService.getApi() + this.type + '/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField;
    return this.http.get(url, {params: httpParams});

  }

  public searchOnlinebooking(page: number, perPage: number, sortOrder: string, sortField: string, keyword: string) {

    if (keyword === undefined) {
      keyword = '';
    }
    let httpParams = new HttpParams();
    httpParams = httpParams.set('keyword', keyword);
    const url = this.configService.getApi() + this.type + '/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField + '/true';
    return this.http.get(url, {params: httpParams});

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

  public searchByType(page: number, perPage: number, sortOrder: string, sortField: string, keyword: string, type: string) {

    if (keyword === undefined) {
      keyword = '';
    }
    let httpParams = new HttpParams();
    httpParams = httpParams.set('keyword', keyword);
    const url = this.configService.getApi() + this.type + '/type/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField + '/' + type;
    return this.http.get(url, {params: httpParams});

  }

  public searchByUser(page: number, perPage: number, sortOrder: string, sortField: string, keyword: string, userId: string) {

    if (keyword === undefined) {
      keyword = '';
    }
    let httpParams = new HttpParams();
    httpParams = httpParams.set('keyword', keyword);
    const url = this.configService.getApi() + this.type + '/user/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField + '/' + userId;
    return this.http.get(url, {params: httpParams});

  }

  public getAll() {

    const url = this.configService.getApi() + this.type + '/all';
    return this.http.get(url);

  }

  public save(item: any) {
    const url = this.configService.getApi() + this.type;
    return this.http.put(url, item);
  }

  public review(item: any) {
    const url = this.configService.getApi() + this.type + '/review';
    return this.http.put(url, item);
  }

  public delete(id: string) {
    const url = this.configService.getApi() + this.type + '/' + id;
    return this.http.delete(url);
  }

  public get(id: string) {

    const url = this.configService.getApi() + this.type + '/' + id;
    return this.http.get(url);

  }

}
