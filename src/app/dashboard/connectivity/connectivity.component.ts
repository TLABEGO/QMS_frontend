import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {UsersService} from '../users/users.service';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {Location} from '@angular/common';
import {DeviceConnectivity} from './devices/device';
import {DevicesService} from './devices.service';
import {Results} from '../../core/results';
import {HttpErrorResponse} from '@angular/common/http';
declare var moment: any;
declare var bootbox: any;

@Component({
  selector: 'app-connectivity',
  templateUrl: './connectivity.component.html',
  styleUrls: ['./connectivity.component.css']
})
export class ConnectivityComponent extends CoreComponent implements OnDestroy {

  public results: Array<DeviceConnectivity>;
  interval: any;

  constructor(public meta: Meta,
              public title: Title,
              public devicesService: DevicesService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public usersService: UsersService,
              public route: ActivatedRoute,
              public location: Location) {
    super(devicesService, toasterService, route, location);
    this.title.setTitle('Devices');
  }

  public ngOnInit(): void {
    const that = this;
    that.search();
    this.interval = setInterval(() => {
      that.refresh();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  public refresh() {
    this.search();
  }


  lessThanThreeMinuteAgo = (date) => {
    return moment(date).isAfter(moment().subtract(3, 'minute'));
  };

  search() {

    if (this.branch !== null && this.branch !== undefined) {
      this.coreService.searchByBranch(this.currentPage, this.perPage, this.order, this.orderBy, this.keyword, this.branch.id)
        .subscribe((data: Results) => {
          this.data = data;
          this.results = data.content;
          this.totalItems = data.totalElements;
        }, (error: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toasterService.pop('error', 'Error', error.error.message);
        });
    } else {
      this.coreService.search(this.currentPage, this.perPage, this.order, this.orderBy, this.keyword)
        .subscribe((data: Results) => {
          this.data = data;
          this.results = data.content;
          this.totalItems = data.totalElements;
        }, (error: HttpErrorResponse) => {
          this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

  }

  remove(deviceConnectivity: DeviceConnectivity) {

    const that = this;
    bootbox.confirm({
      title: 'Delete device at ' + deviceConnectivity.branch.name,
      message: 'Are you sure you want to delete ' + deviceConnectivity.deviceId + ' at <strong>' + deviceConnectivity.branch.name + '</strong>',
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.devicesService.delete(deviceConnectivity.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a device', 'device successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

}
