import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {User} from './user/user';
import {CoreComponent} from '../../core/core.component';
import {UsersService} from './users.service';
import {ConfigService} from '../../core/config.service';
import {ActivatedRoute} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {Location} from '@angular/common';

declare var bootbox: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends CoreComponent {

  public results: Array<User>;

  constructor(public meta: Meta,
              public title: Title,
              public usersService: UsersService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public location: Location) {
    super(usersService, toasterService, route, location);
    this.title.setTitle('Users');

  }

  remove(user: User) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + user.firstName + ' ' + user.lastName,
      message: 'Are you sure you want to delete ' + user.firstName + ' ' + user.lastName,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.usersService.delete(user.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a user', 'user successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }


}
