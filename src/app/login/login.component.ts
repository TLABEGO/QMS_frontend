import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Login} from './login';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {UsersService} from '../dashboard/users/users.service';
import {ConfigService} from '../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpErrorResponse} from '@angular/common/http';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public login: Login;
  public reset: boolean;
  @BlockUI() blockUI: NgBlockUI;

  constructor(public usersService: UsersService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              private router: Router,
              public title: Title,
              public route: ActivatedRoute,
              public cookieService: CookieService) {
    this.reset = false;
  }

  ngOnInit() {
    this.login = new Login();
    this.reset = false;
    this.usersService.logout().subscribe((data: Login) => {
    });
    this.cookieService.deleteAll();
    this.cookieService.delete('X_TOKEN');
    this.title.setTitle('Login');

  }

  ngAfterViewInit() {
    this.cookieService.deleteAll();
    this.cookieService.delete('X_TOKEN');
  }

  public onReset() {
    this.cookieService.deleteAll();
    this.cookieService.delete('X_TOKEN');
    const that = this;
    this.blockUI.start('Loading');
    this.usersService.reset(this.login.username).subscribe((data: Login) => {
      that.toasterService.pop('info', 'Reset email', 'A password reset email has been sent to ' + that.login.username);
      this.blockUI.stop();
    }, (error: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toasterService.pop('error', 'Error', error.error.message);
    });
  }


  public onLogin() {
    this.cookieService.deleteAll();
    this.cookieService.delete('X_TOKEN');
    this.blockUI.start('Loading');
    this.usersService.login(this.login).subscribe((data: Login) => {
      this.cookieService.set('X_TOKEN', data.token);
      this.cookieService.set('PERMISSIONS', JSON.stringify(data.permissions));
      this.blockUI.stop();
      if (this.usersService.hasPermission('PERM_ADMIN') || this.usersService.hasPermission('PERM_BRANCHADMIN')) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/dashboard/tickets']);
      }
    }, (error: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toasterService.pop('error', 'Error', error.error.message);
    });
  }


}
