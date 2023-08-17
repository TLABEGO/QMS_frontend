import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {CoreComponent} from '../../core/core.component';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Service} from './service/service';
import {ServicesService} from './services.service';
import {UsersService} from '../users/users.service';
declare var bootbox: any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent extends CoreComponent {

  public results: Array<Service>;

  constructor(public meta: Meta,
              public title: Title,
              public servicesService: ServicesService,
              public usersService: UsersService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public location: Location) {
    super(servicesService, toasterService, route, location);
    this.title.setTitle('Services');

  }

  remove(service: Service) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + service.name,
      message: 'Are you sure you want to delete ' + service.name,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.servicesService.delete(service.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a service', 'service successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

}
