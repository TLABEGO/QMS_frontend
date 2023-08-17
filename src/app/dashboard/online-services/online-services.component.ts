import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Branch} from '../branches/branch/branch';
import {Meta, Title} from '@angular/platform-browser';
import {OnlineServicesService} from './online-services.service';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {UsersService} from '../users/users.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {OnlineService} from './online-service/online-service';
declare var bootbox: any;
@Component({
  selector: 'app-online-services',
  templateUrl: './online-services.component.html',
  styleUrls: ['./online-services.component.css']
})
export class OnlineServicesComponent extends CoreComponent {

  public results: Array<OnlineService>;

  constructor(public meta: Meta,
              public title: Title,
              public services: OnlineServicesService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public usersService: UsersService,
              public route: ActivatedRoute,
              public location: Location) {
    super(services, toasterService, route, location);
    this.title.setTitle('Online Services');
  }

  remove(onlineService: OnlineService) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + onlineService.name,
      message: 'Are you sure you want to delete ' + onlineService.name,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.services.delete(onlineService.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a Online service', 'Online service successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

}
