import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Image} from './image';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private api = 'http://localhost:8080/qms-msrv/';

  constructor(public cookieService: CookieService) { }

  public getPermissions(): string[] {

    try {
      return JSON.parse(this.cookieService.get('PERMISSIONS'));
    } catch (e) {
    }
    return [];

  }

  public getDocument(data: string, file: any): Image {

    const document = new Image();
    document.contentType = data.substr(0, data.indexOf(';')).replace('data:', '');
    document.content = data.substr(data.indexOf(';'), data.length).replace(';base64,', '');
    document.name = file.name;
    return document;

  }

  public getApi(): string {
    return this.api;
  }

}
