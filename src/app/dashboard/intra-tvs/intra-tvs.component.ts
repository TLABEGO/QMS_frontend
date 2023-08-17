import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {ConfigService} from '../../core/config.service';
import {UsersService} from '../users/users.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {IntraTv} from './intra-tv/intra-tv';
import {IntraTvsService} from './intra-tvs.service';
declare var bootbox: any;
@Component({
  selector: 'app-intra-tvs',
  templateUrl: './intra-tvs.component.html',
  styleUrls: ['./intra-tvs.component.css']
})
export class IntraTvsComponent  extends CoreComponent {

  public results: Array<IntraTv>;

  constructor(public meta: Meta,
              public title: Title,
              public intraTvsService: IntraTvsService,
              public configService: ConfigService,
              public usersService: UsersService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public location: Location) {
    super(intraTvsService, toasterService, route, location);
    this.title.setTitle('IntraTvs');

  }

  remove(intraTv: IntraTv) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + intraTv.name,
      message: 'Are you sure you want to delete ' + intraTv.name,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.intraTvsService.delete(intraTv.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a Intra TV', ' Intra TV successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

}
