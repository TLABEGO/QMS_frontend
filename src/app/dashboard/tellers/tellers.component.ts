import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {CoreComponent} from '../../core/core.component';
import {Service} from '../services/service/service';
import {ServicesService} from '../services/services.service';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Teller} from './teller/teller';
import {TellersService} from './tellers.service';
import {UsersService} from '../users/users.service';
declare var bootbox: any;
@Component({
  selector: 'app-tellers',
  templateUrl: './tellers.component.html',
  styleUrls: ['./tellers.component.css']
})
export class TellersComponent extends CoreComponent {

  public results: Array<Teller>;

  constructor(public meta: Meta,
              public title: Title,
              public tellersService: TellersService,
              public configService: ConfigService,
              public usersService: UsersService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public location: Location) {
    super(tellersService, toasterService, route, location);
    this.title.setTitle('Tellers');

  }

  remove(teller: Teller) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + teller.name,
      message: 'Are you sure you want to delete ' + teller.name,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.tellersService.delete(teller.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a teller', 'teller successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

}
