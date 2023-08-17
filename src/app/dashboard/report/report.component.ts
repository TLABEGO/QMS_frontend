import {Component, OnInit} from '@angular/core';
import {TicketsService} from '../tickets/tickets.service';
import {BranchCount, StatusCount} from './statuscount';
import {HttpErrorResponse} from '@angular/common/http';
import {CoreComponent} from '../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {ConfigService} from '../../core/config.service';
import {ActivatedRoute} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {Location} from '@angular/common';
import {Color} from 'ng2-charts';
import {Report} from './report';
import {ReportForm} from './report.form';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {UsersService} from '../users/users.service';
import {User} from '../users/user/user';

declare var moment: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent extends CoreComponent {

  public reportForm: ReportForm = new ReportForm();
  public statusCount: Array<StatusCount>;
  public branchCount: Array<BranchCount>;
  public colors: Color[] = new Array();
  public colorsStr: string[] = new Array<string>();
  public chartData: number[] = new Array();
  public chartLabels: string[] = new Array();

  public branchColorsStr: string[] = new Array<string>();
  public branchColors: Color[] = new Array();
  public branchChartData: number[] = new Array();
  public branchChartLabels: string[] = new Array();

  public start: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth(), 1);
  public end: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

  lineChartData = [
    {data: [], label: 'SMSes'},
    {data: [], label: 'Emails'},
    {data: [], label: 'Push Notifications'}
  ];

  lineChartLabels = [];
  chartOptions = {
    responsive: true
  };

  constructor(public meta: Meta,
              public title: Title,
              public ticketsService: TicketsService,
              public configService: ConfigService,
              public route: ActivatedRoute,
              public toasterService: ToasterService,
              public usersService: UsersService,
              public location: Location) {
    super(ticketsService, toasterService, route, location);
    this.title.setTitle('Reports');
  }

  clear() {
    this.reportForm.teller = null;
    this.reportForm.service = null;
  }

  clearTeller() {
    this.reportForm.teller = null;
  }

  search() {
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


    this.chartLabels = new Array();
    this.chartData = new Array();
    const that = this;
    this.branchChartData = new Array();
    this.branchChartLabels = new Array();
    this.branchColors = new Array();
    this.colors = new Array();
    this.colorsStr = new Array<string>();
    this.chartData = new Array();
    this.chartLabels = new Array();
    this.branchColorsStr = new Array<string>();
    this.branchColors = new Array();
    this.branchChartData = new Array();
    this.branchChartLabels = new Array();
    this.lineChartLabels = [];
    this.ticketsService.branchCount(this.reportForm).subscribe((data: Array<BranchCount>) => {
      that.branchCount = data;
      data.forEach((dt: BranchCount) => {
        if (dt.id !== null && dt.id !== undefined) {
          that.branchChartData.push(dt.count);
          that.branchChartLabels.push(dt.id.name + ' (' + dt.count + ')');
          that.branchColorsStr.push(that.dynamicColor());
        }
      });
      that.branchColors.push({
        backgroundColor: that.branchColorsStr
      });
    });
    this.ticketsService.statusCount(this.reportForm).subscribe((data: Array<StatusCount>) => {

      that.statusCount = data;
      data.forEach((dt: StatusCount) => {
        if (dt.id !== null && dt.id !== undefined) {
          that.chartData.push(dt.count);
          that.chartLabels.push(dt.id + ' (' + dt.count + ')');
          if (dt.id === 'SERVICED') {
            that.colorsStr.push('#228B22');
          } else if (dt.id === 'WAITING') {
            that.colorsStr.push('#FFA500');
          } else if (dt.id === 'ABANDON') {
            that.colorsStr.push('#FF6347');
          } else if (dt.id === 'SERVICING') {
            that.colorsStr.push('#FFFF00');
          }
        }

      });
      that.colors.push({
        backgroundColor: that.colorsStr
      });

    });

    this.ticketsService.report(this.reportForm).subscribe((data: Array<Report>) => {

      const SERVICED = new Map<string, number>();
      const WAITING = new Map<string, number>();
      const ABANDON = new Map<string, number>();
      const SERVICING = new Map<string, number>();
      const days = Array<string>();
      let serviced = 0;
      let waiting = 0;
      let abandon = 0;
      let servicing = 0;
      data.forEach((report: Report) => {
        const dt = moment(report.date).format('DD MMMM YYYY hh:mm');
        if (!days.includes(dt)) {
          days.push(dt);
        }
        if (report.status === 'SERVICED') {
          serviced = report.count;
          SERVICED.set(dt, serviced);
        } else if (report.status === 'WAITING') {
          waiting = report.count;
          WAITING.set(dt, waiting);
        } else if (report.status === 'ABANDON') {
          abandon = report.count;
          ABANDON.set(dt, abandon);
        } else if (report.status === 'SERVICING') {
          servicing = report.count;
          SERVICING.set(dt, servicing);
        }
      });

      this.lineChartLabels = days;
      const SERVICEDs = Array<number>();
      const WAITINGs = Array<number>();
      const ABANDONs = Array<number>();
      const SERVICINGs = Array<number>();
      days.forEach((dt: string) => {

        let num = SERVICED.get(dt);
        if (num === undefined) {
          num = 0;
        }
        SERVICEDs.push(num);
        num = WAITING.get(dt);
        if (num === undefined) {
          num = 0;
        }
        WAITINGs.push(num);
        num = ABANDON.get(dt);
        if (num === undefined) {
          num = 0;
        }
        ABANDONs.push(num);

        num = SERVICING.get(dt);
        if (num === undefined) {
          num = 0;
        }
        SERVICINGs.push(num);


      });
      this.lineChartData = [
        {data: SERVICEDs, label: 'SERVICED'},
        {data: WAITINGs, label: 'WAITING'},
        {data: ABANDONs, label: 'ABANDON'},
        {data: SERVICINGs, label: 'SERVICING'}
      ];
      this.blockUI.stop();

    }, (error: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toasterService.pop('error', 'Error', error.error.message);
    });
  }

  ngOnInit() {

    this.usersService.getProfile().subscribe((data: User) => {
      this.reportForm.branch = data.branch;
    });
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
    this.search();
  }

  public dynamicColor(): string {
    return '#' + Math.floor(0x1000000 * Math.random()).toString(16);
  }

  exportAsPDF() {
    this.blockUI.start('Loading');
    const data = document.getElementById('report');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('l', 'cm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('City of ekuruleni QMS Report ' + this.reportForm.start + ' - ' + this.reportForm.end + '.pdf');
      this.blockUI.stop();
    });
  }

  exportAsExcel(name: string) {
    this.blockUI.start('Loading');
    let reportName = 'City of Ekurhuleni  Queue Management System';
    this.reportForm.type = name;
    this.reportForm.status = null;

    if (name === 'Abandon') {
      this.reportForm.status = 'ABANDON';
    }
    if (name === 'Close') {
      this.reportForm.status = 'SERVICED';
    }
    if (name === 'Active') {
      this.reportForm.status = 'WAITING';
    }

    reportName += this.reportForm.type;

    if (this.reportForm.start) {
      reportName += ' ' + moment(this.reportForm.start).format('DD MMMM YYYY');
    }
    if (this.reportForm.end) {
      reportName += ' - ' + moment(this.reportForm.end).format('DD MMMM YYYY');
    }

    if (this.reportForm.branch) {
      reportName += ' ' + this.reportForm.branch.name;
    }
    if (this.reportForm.service) {
      reportName += ' ' + this.reportForm.service.name;
    }
    if (this.reportForm.teller) {
      reportName += ' ' + this.reportForm.teller.name;
    }
    if (this.reportForm.closingReason) {
      reportName += ' ' + this.reportForm.closingReason.name;
    }
    this.ticketsService.download(this.reportForm)
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
