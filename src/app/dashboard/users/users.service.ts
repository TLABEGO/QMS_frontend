import { Injectable } from '@angular/core';
import {CoreService} from '../../core/core.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {CookieService} from 'ngx-cookie-service';
import {Router, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs';
import {Login} from '../../login/login';
import {LoggedIn} from '../../login/loggedin';
@Injectable({
  providedIn: 'root'
})
export class UsersService extends CoreService {

  private returnUrl: string;

  constructor(public http: HttpClient, public configService: ConfigService, public toasterService: ToasterService,
              public cookieService: CookieService, private router: Router) {
    super('users', http, configService, toasterService);
  }

  public upload(file: any) {

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const url = this.configService.getApi() + this.type + '/upload';
    return this.http.post(url, formData, {headers});
  }

  public reset(username: string) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('keyword', username);
    const url = this.configService.getApi() + this.type + '/resetpassword';
    return this.http.get(url, {params: httpParams});

  }

  public hasPermission(item: string): boolean {
    let ret = false;
    const roles = this.getCachedPermissions();
    roles.forEach((role: string) => {
      if (role === 'PERM_ADMIN') {
        ret = true;
        return;
      } else if (role === item) {
        ret = true;
        return;
      }
    });
    return ret;
  }

  public logout() {

    const url = this.configService.getApi() + this.type + '/logout';
    return this.http.get(url);

  }

  public login(login: Login) {
    return this.http.post(this.configService.getApi() + this.type + '/login', login);
  }


  public loggedIn(state: RouterStateSnapshot): Observable<boolean> {

    const url = this.configService.getApi() + this.type + '/loggedin';
    return this.http.get(url).map((data: LoggedIn) => {
      if (data.loggedIn === false) {
        this.setReturnUrl(state.url);
        this.router.navigate(['/']);
      }
      return data.loggedIn;

    });
  }

  public setReturnUrl(returnUrl: string) {
    this.returnUrl = returnUrl;
  }

  public getReturnUrl() {
    return this.returnUrl;
  }

  public getProfile() {

    const url = this.configService.getApi() + this.type + '/profile';
    return this.http.get(url);

  }

  public getCachedPermissions(): Array<string> {

    try {
      return JSON.parse(this.cookieService.get('PERMISSIONS'));
    } catch (e) {
    }
    return new Array<string>();

  }

}
