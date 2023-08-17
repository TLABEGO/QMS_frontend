import {Injectable} from '@angular/core';
import {CoreService} from '../../core/core.service';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ReportForm} from '../report/report.form';
import {Service} from '../services/service/service';
import {Ticket} from './ticket/ticket';
import {Branch} from '../branches/branch/branch';

@Injectable({
  providedIn: 'root'
})
export class TicketsService extends CoreService {

  public subject: WebSocket;

  constructor(public http: HttpClient, public configService: ConfigService, public toasterService: ToasterService) {
    super('tickets', http, configService, toasterService);
  }

  public searchWaiting(page: number, perPage: number, sortOrder: string, sortField: string) {
    const url = this.configService.getApi() + this.type + '/waiting/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField;
    return this.http.get(url);
  }

  public filter(page: number, perPage: number, sortOrder: string, sortField: string, keyword: string, startDate: string, endDate: string, branch: Branch, service: Service) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('keyword', keyword);
    httpParams = httpParams.set('startDate', startDate);
    httpParams = httpParams.set('endDate', endDate);
    if (branch) {
      httpParams = httpParams.set('branchId', branch.id);
    }
    if (service) {
      httpParams = httpParams.set('serviceId', service.id);
    }
    const url = this.configService.getApi() + this.type + '/filter/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField;
    return this.http.get(url, {params: httpParams});
  }

  public getServicing() {
    const url = this.configService.getApi() + this.type + '/servicing';
    return this.http.get(url);
  }

  public getServicingByTeller(tellerId: string) {
    const url = this.configService.getApi() + this.type + '/servicing/' + tellerId;
    return this.http.get(url);
  }

  public searchWaitingByTeller(page: number, perPage: number, sortOrder: string, sortField: string, tellerId: string) {
    const url = this.configService.getApi() + this.type + '/waiting/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField + '/' + tellerId;
    return this.http.get(url);
  }

  public searchWaitingByService(page: number, perPage: number, sortOrder: string, sortField: string, serviceId: string) {
    const url = this.configService.getApi() + this.type + '/waiting-service/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField + '/' + serviceId;
    return this.http.get(url);
  }

  public searchWaitingByServiceAllDate(page: number, perPage: number, sortOrder: string, sortField: string, serviceId: string) {
    const url = this.configService.getApi() + this.type + '/all-day-waiting-service/' + page + '/' + perPage + '/' + sortOrder + '/' + sortField + '/' + serviceId;
    return this.http.get(url);
  }

  public download(reportForm: ReportForm) {

    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Accept', 'application/vnd.ms-excel');
    const url = this.configService.getApi() + this.type + '/download';
    return this.http.post(url, reportForm, {headers: httpHeaders, responseType: 'blob'});

  }

  public downloadTicket(ticket: Ticket) {

    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Accept', 'text/calendar');
    const url = this.configService.getApi() + this.type + '/download/' + ticket.id;
    return this.http.get(url, {headers: httpHeaders, responseType: 'blob'});

  }

  public getAllByBranch(branchId: string) {

    const url = this.configService.getApi() + this.type + '/branch/' + branchId;
    return this.http.get(url);

  }

  public subscribe(branchId: string) {
    this.subject = new WebSocket('wss://qms.seedinc.co.za/qms-msrv/app/updates?branchId=' + branchId);

  }
}
