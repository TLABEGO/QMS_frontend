import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/timeout';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor {

  @BlockUI() blockUI: NgBlockUI;

  constructor(public cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authToken = this.cookieService.get('X_TOKEN');
    if (authToken !== undefined && authToken !== null && authToken !== '') {
      const headers = req.headers.set('X_TOKEN', authToken);
      const authReq = req.clone({headers: headers, params: req.params});
      return next.handle(authReq).timeout(120000);
    }
    return next.handle(req).timeout(120000);

  }



}
