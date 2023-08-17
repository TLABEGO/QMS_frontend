import {Component, Input, OnInit} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {UsersService} from '../users/users.service';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {EntriesService} from './entries.service';
import {Entry} from './entry/entry';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {StatusCount} from '../../core/statuscount';
import {Color} from 'ng2-charts';
import {ReportForm} from '../report/report.form';

declare var bootbox: any;
declare var moment: any;

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent extends CoreComponent {

  public start: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth(), 1);
  public end: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  public results: Array<Entry>;

  public statusCount: Array<StatusCount>;
  public reportForm: ReportForm = new ReportForm();
  public chartData: number[] = new Array();
  public chartLabels: string[] = new Array();
  public colorsStr: string[] = new Array<string>();
  public colors: Color[] = new Array();

  constructor(public meta: Meta,
              public title: Title,
              public entriesService: EntriesService,
              public usersService: UsersService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public location: Location) {
    super(entriesService, toasterService, route, location);
    this.title.setTitle('Covid Tracking');

  }

  public ngOnInit(): void {

    this.search();
    this.reportForm.start = moment({
      year: this.start.year,
      month: this.start.month - 1,
      date: this.start.day
    }).format('DD MMMM YYYY');
    this.reportForm.end = moment({
      year: this.end.year,
      month: this.end.month - 1,
      date: this.end.day
    }).format('DD MMMM YYYY');
    const that = this;
    this.entriesService.statusCount(this.reportForm).subscribe((data: Array<StatusCount>) => {
      that.statusCount = data;
      data.forEach((dt: StatusCount) => {
        if (dt.id !== null && dt.id !== undefined) {
          that.chartData.push(dt.count);
          that.chartLabels.push((dt.id === true ? 'Flagged' : 'Not Flagged') + ' (' + dt.count + ')');
          if (dt.id === true) {
            that.colorsStr.push('#ff0000');
          } else {
            that.colorsStr.push('#81AF6F');
          }
        }
      });
      that.colors.push({
        backgroundColor: that.colorsStr
      });
    });

  }

  remove(entry: Entry) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + entry.user === null || entry.user === undefined ? '-' : entry.user.firstName,
      message: 'Are you sure you want to delete ' + entry.user === null || entry.user === undefined ? '-' : entry.user.firstName,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.entriesService.delete(entry.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a entry', 'entry successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

  exportAsExcel() {
    this.blockUI.start('Loading');
    const reportName = 'City of Ekurhuleni  Covid Tracking System';
    this.entriesService.download()
      .subscribe(res => {
        const url = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', reportName + ' ' + name + ' Report.xlsx');
        document.body.appendChild(link);
        link.click();
        this.blockUI.stop();
      }, (error: HttpErrorResponse) => {
        this.blockUI.stop();
        this.toasterService.pop('error', 'Error', error.error.message);
      });
  }

}
