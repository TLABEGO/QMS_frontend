import {Injectable} from '@angular/core';
import {CoreService} from './core.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConfigService} from './config.service';
import {ToasterService} from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService extends CoreService {

  constructor(public http: HttpClient, public configService: ConfigService, public toasterService: ToasterService) {
    super('file', http, configService, toasterService);
  }

  public upload(file: File) {

    const formData = new FormData();
    formData.append('file', file);
    const url = this.configService.getApi() + this.type + '/upload';
    return this.http.post(url, formData);
  }

}
