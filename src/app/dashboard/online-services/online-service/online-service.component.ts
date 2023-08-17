import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {Branch} from '../../branches/branch/branch';
import {Meta, Title} from '@angular/platform-browser';
import {BranchesService} from '../../branches/branches.service';
import {ConfigService} from '../../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {UsersService} from '../../users/users.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {OnlineService} from './online-service';
import {OnlineServicesService} from '../online-services.service';
declare var bootbox: any;
@Component({
  selector: 'app-online-service',
  templateUrl: './online-service.component.html',
  styleUrls: ['./online-service.component.css']
})
export class OnlineServiceComponent extends CoreComponent {

  public item = new OnlineService();

  constructor(public meta: Meta,
              public title: Title,
              public services: OnlineServicesService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public usersService: UsersService,
              public route: ActivatedRoute,
              public location: Location) {
    super(services, toasterService, route, location);
    this.title.setTitle('Online Service Details');
  }

}
