import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {CoreComponent} from '../../core/core.component';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ClosingReasonsService} from './closing-reasons.service';
import {ClosingReason} from './closing-reason/closing-reason';
import {UsersService} from '../users/users.service';
declare var bootbox: any;
@Component({
  selector: 'app-closing-reasons',
  templateUrl: './closing-reasons.component.html',
  styleUrls: ['./closing-reasons.component.css']
})
export class ClosingReasonsComponent  extends CoreComponent {

  public results: Array<ClosingReason>;

  constructor(public meta: Meta,
              public title: Title,
              public closingReasonsService: ClosingReasonsService,
              public usersService: UsersService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public location: Location) {
    super(closingReasonsService, toasterService, route, location);
    this.title.setTitle('Closing Reasons');
  }

  remove(closingReason: ClosingReason) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + closingReason.name,
      message: 'Are you sure you want to delete ' + closingReason.name,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.closingReasonsService.delete(closingReason.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a branch', 'closing reason successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

}

