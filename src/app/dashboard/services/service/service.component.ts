import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {User} from '../../users/user/user';
import {Meta, Title} from '@angular/platform-browser';
import {UsersService} from '../../users/users.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';
import {Service} from './service';
import {ServicesService} from '../services.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent extends CoreComponent implements OnInit {

  public item: Service;

  constructor(public meta: Meta,
              public title: Title,
              public servicesService: ServicesService,
              public userService: UsersService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(servicesService, toasterService, route, location);
    this.title.setTitle('Service Details');
  }


  public ngOnInit(): void {

    this.item = new Service();
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      }
    });

  }
}
