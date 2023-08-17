import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {CoreComponent} from '../../core/core.component';
import {Service} from '../services/service/service';
import {ServicesService} from '../services/services.service';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DisplayInformation} from './display-information/display-information';
import {DisplayInformationsService} from './display-informations.service';
import {UsersService} from '../users/users.service';
declare var bootbox: any;
@Component({
  selector: 'app-display-informations',
  templateUrl: './display-informations.component.html',
  styleUrls: ['./display-informations.component.css']
})
export class DisplayInformationsComponent  extends CoreComponent {

  public results: Array<DisplayInformation>;

  constructor(public meta: Meta,
              public title: Title,
              public displayInformationsService: DisplayInformationsService,
              public configService: ConfigService,
              public usersService: UsersService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public location: Location) {
    super(displayInformationsService, toasterService, route, location);
    this.title.setTitle('LCD Display Information');

  }

  remove(displayInformation: DisplayInformation) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + displayInformation.shortDescription,
      message: 'Are you sure you want to delete ' + displayInformation.shortDescription,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.displayInformationsService.delete(displayInformation.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a Display Information', 'Display Information successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

  deactivated(displayInformation: DisplayInformation) {

    const that = this;
    bootbox.confirm({
      title: 'Deactivated ' + displayInformation.shortDescription,
      message: 'Are you sure you want to deactivated ' + displayInformation.shortDescription,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          displayInformation.status = 'InActive';
          that.displayInformationsService.save(displayInformation).subscribe(data => {
            that.toasterService.pop('info', 'Deactivated Display Information', 'Display Information successfully Deactivated :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

  activated(displayInformation: DisplayInformation) {

    const that = this;
    bootbox.confirm({
      title: 'Active ' + displayInformation.shortDescription,
      message: 'Are you sure you want to Active ' + displayInformation.shortDescription,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          displayInformation.status = 'Active';
          that.displayInformationsService.save(displayInformation).subscribe(data => {
            that.toasterService.pop('info', 'Active Display Information', 'Display Information successfully Actived :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

}
