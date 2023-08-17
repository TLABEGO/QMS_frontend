import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {CoreComponent} from '../../core/core.component';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {Location} from '@angular/common';
import {TicketsService} from './tickets.service';
import {Keys, Ticket, WebPushSubscription} from './ticket/ticket';
import {Results} from '../../core/results';
import {User} from '../users/user/user';
import {UsersService} from '../users/users.service';
import {TellersService} from '../tellers/tellers.service';
import {Teller} from '../tellers/teller/teller';
import {ClosingReason} from '../closing-reasons/closing-reason/closing-reason';
import {ClosingReasonsService} from '../closing-reasons/closing-reasons.service';
import {TimeSpan} from '../../core/timespan';
import {Color} from 'ng2-charts';
import {ReportForm} from '../report/report.form';
import {ServiceCount} from '../report/statuscount';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';
import {SwPush} from '@angular/service-worker';

declare var bootbox: any;
declare var moment: any;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent extends CoreComponent implements OnDestroy {

  public reportForm: ReportForm = new ReportForm();
  public results: Array<Ticket>;
  public start: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  public end: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  public tellers: Array<Teller>;
  public closingReasons: Array<ClosingReason>;
  public servicing: Ticket;
  public nextTicket: Ticket;
  @Input() public user: User;
  @Input() public currentUser: User;
  public date: Date;
  public diplayTickets: boolean = false;
  public timeSpan: TimeSpan;
  interval: any;
  secondInterval: any;
  public serviceCount: Array<ServiceCount>;
  public branchColorsStr: string[] = new Array<string>();
  public branchColors: Color[] = new Array();
  public branchChartData: number[] = new Array();
  public branchChartLabels: string[] = new Array();
  readonly VAPID_PUBLIC_KEY = 'BMNxdeUqn69sQTIcyPpff4ja-gZImjG1NqDlGkb688NZBbynEDFs64WH22BwICJ4SI1SMUk5yoempKtg8cf_ql0';


  constructor(public meta: Meta,
              public title: Title,
              public ticketsService: TicketsService,
              public tellersService: TellersService,
              public closingReasonsService: ClosingReasonsService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public location: Location,
              public usersService: UsersService,
              private swPush: SwPush) {
    super(ticketsService, toasterService, route, location);
    this.title.setTitle('Track Tickets');
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.secondInterval);
  }

  public ngOnInit(): void {

    const that = this;
    this.route.url.subscribe((urlSegments: UrlSegment[]) => {
        that.diplayTickets = urlSegments.length > 0;
      }
    );
    this.date = new Date();
    this.timeSpan = new TimeSpan();
    this.load();
    this.interval = setInterval(() => {
      that.refresh();
    }, 1000);

    this.secondInterval = setInterval(() => {
      that.refreshGraph();
    }, 60000);


    this.closingReasonsService.getAll().subscribe((closingReasons: Array<ClosingReason>) => {
      this.closingReasons = closingReasons;
    });
    this.usersService.getProfile().subscribe((data: User) => {
      that.currentUser = data;
      this.refreshGraph();

      if (this.currentUser.branch) {
        this.tellersService.searchByBranch(1, 50, 'ASC', 'name', '', this.currentUser.branch.id).subscribe((ret: Results) => {
          this.tellers = ret.content;
        });
      }
      if (this.currentUser.teller !== null && this.currentUser.teller !== undefined) {
        this.subscribe();
      }
      if (this.currentUser.branch && this.currentUser.teller) {
        this.ticketsService.subscribe(this.currentUser.teller.branch.id);
        this.ticketsService.subject.onmessage = (evt) => {
          this.load();
        };
        this.ticketsService.subject.onopen = (evt) => {
          console.log(evt);
        };
        this.ticketsService.subject.onerror = (evt) => {
          console.log(evt);
        };

        this.ticketsService.subject.onclose = (evt) => {
          console.log(evt);
        };
      }

    });
  }

  refreshGraph() {

    if (this.usersService.hasPermission('PERM_BRANCHADMIN')) {
      if (this.currentUser.branch) {
        this.reportForm.branch = this.currentUser.branch;
      }

    }
    const that = this;
    this.branchColorsStr = new Array<string>();
    this.branchColors = new Array();
    this.branchChartData = new Array();
    this.branchChartLabels = new Array();
    this.ticketsService.serviceCount(this.reportForm).subscribe((data: Array<ServiceCount>) => {
      this.serviceCount = data;
      data.forEach((dt: ServiceCount) => {
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
  }

  public dynamicColor(): string {
    return '#' + Math.floor(0x1000000 * Math.random()).toString(16);
  }

  getTimeElapsed(createDate: Date, serviceDate: Date) {
    if (serviceDate === null || serviceDate === undefined) {
      serviceDate = new Date();
    }
    if (createDate === null || createDate === undefined) {
      createDate = new Date();
    }
    const time = new Date(serviceDate).getTime() - new Date(createDate).getTime();
    let hoursDiff = time / (3600 * 1000);

    if (hoursDiff < 1) {
      console.log(hoursDiff);
      hoursDiff *= 60;
    }
    return hoursDiff;
  }

  public search() {

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

    if (this.user !== null && this.user !== undefined) {
      this.blockUI.start('Loading');
      this.ticketsService.searchByUser(this.currentPage, this.perPage, this.order, this.orderBy, this.keyword, this.user.id)
        .subscribe((data: Results) => {
          this.blockUI.stop();
          this.data = data;
          this.results = data.content;
          this.totalItems = data.totalElements;
        }, (error: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toasterService.pop('error', 'Error', error.error.message);
        });
    } else {
      this.blockUI.start('Loading');
      this.ticketsService.filter(this.currentPage, this.perPage, this.order, this.orderBy, this.keyword, this.reportForm.start, this.reportForm.end, this.reportForm.branch, this.reportForm.service)
        .subscribe((data: Results) => {
          this.blockUI.stop();
          this.data = data;
          this.results = data.content;
          this.totalItems = data.totalElements;
        }, (error: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toasterService.pop('error', 'Error', error.error.message);
        });
    }


  }

  load() {
    const that = this;
    if (this.usersService.hasPermission('PERM_ADMIN') || this.usersService.hasPermission('PERM_BRANCHADMIN')) {
      this.search();
    }
    this.ticketsService.getServicing().subscribe((ticket: Ticket) => {
      that.servicing = ticket;
    });

    this.ticketsService.searchWaiting(1, 1, 'ASC', 'createDate').subscribe((data: Results) => {
      if (data.numberOfElements > 0) {
        that.nextTicket = data.content[0];
      } else {
        that.nextTicket = null;
      }
    });
  }

  call(ticket: Ticket) {
    ticket.teller = this.currentUser.teller;
    ticket.status = 'SERVICING';
    const that = this;
    bootbox.confirm({
      title: 'Call ticket #' + ticket.reference,
      message: 'Are you sure you want to call ' + ticket.reference + '?',
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.ticketsService.save(ticket).subscribe(data => {
            that.load();
            that.toasterService.pop('info', 'Called a ticket', 'ticket successfully called :)');
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }


  abandoned(ticket: Ticket) {

    const that = this;
    ticket.status = 'ABANDON';
    bootbox.confirm({
      title: 'ticket #' + ticket.reference + ' abandon',
      message: 'Are you sure ticket # ' + ticket.reference + ' was abandon?',
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.ticketsService.save(ticket).subscribe(data => {
            that.toasterService.pop('info', 'Ticket abandon', 'ticket successfully abandon :)');
            that.load();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

  selectTeller(teller: Teller) {
    this.servicing.teller = teller;
  }

  selectReason(closingReason: ClosingReason) {
    this.servicing.closingReason = closingReason;
  }

  selectServiceRating(serviceRating: string) {
    this.servicing.serviceRating = serviceRating;

  }

  close(ticket: Ticket) {

    const that = this;
    bootbox.confirm({
      title: 'Close ticket #' + ticket.reference,
      message: 'Are you sure you want to close ' + ticket.reference + '?',
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          ticket.status = 'SERVICED';
          that.ticketsService.save(ticket).subscribe(data => {
            that.toasterService.pop('info', 'Close a ticket', 'ticket successfully closed :)');
            that.load();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

  transfer() {

    const that = this;
    bootbox.confirm({
      title: 'Transfer ticket #' + that.servicing.reference,
      message: 'Are you sure you want to transfer ' + that.servicing.reference + ' to ' + that.servicing.teller.name + '?',
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.servicing.service = that.servicing.teller.service;
          that.servicing.status = 'WAITING';
          that.ticketsService.save(that.servicing).subscribe(data => {
            that.toasterService.pop('info', 'Ticket transferred', 'Ticket #' + that.servicing.reference + ' successfully transferred to ' + that.servicing.teller.name);
            that.load();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

  public refresh() {
    if (this.servicing === null || this.servicing === undefined) {
      return;
    }
    let totalSeconds = Math.floor((new Date().getTime() - new Date(this.servicing.servicingDate).getTime()) / 1000);
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (totalSeconds >= 3600) {
      hours = Math.floor(totalSeconds / 3600);
      totalSeconds -= 3600 * hours;
    }

    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= 60 * minutes;
    }
    seconds = totalSeconds;
    this.timeSpan.hours = hours;
    this.timeSpan.minutes = minutes;
    this.timeSpan.seconds = seconds;
  }

  // close(ticket: Ticket) {
  //
  //   const that = this;
  //   ticket.status = 'SERVICED';
  //   bootbox.confirm({
  //     title: 'Close ticket #' + ticket.reference,
  //     message: 'Are you sure you want to close ' + ticket.reference + '?',
  //     callback: function(result) {
  //       if (result === null) {
  //       } else if (result === true) {
  //         that.ticketsService.save(ticket).subscribe(data => {
  //           that.toasterService.pop('info', 'Close a ticket', 'ticket successfully closed :)');
  //           that.load();
  //         }, error => {
  //           that.toasterService.pop('error', 'Error', error.message);
  //         });
  //       }
  //     }
  //   });
  //
  // }

  remove(ticket: Ticket) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + ticket.reference,
      message: 'Are you sure you want to delete ' + ticket.reference,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.ticketsService.delete(ticket.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a ticket', 'ticket successfully deleted :)');
            that.load();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

  public subscribe(): void {

      console.log('subscribe');
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      }).then((sub: PushSubscription) => {
        this.sendToServer(sub);
      }).catch(err => {
        this.toasterService.pop('error', 'Error', err.message);
        console.log('failed to unscribe : ' + err);
      });
  }

  sendToServer(params: PushSubscription) {
    console.log('sendToServer');
    let teller = this.currentUser.teller;
    teller.pushSubscription = new WebPushSubscription();
    teller.pushSubscription.keys = new Keys();
    teller.pushSubscription.endpoint = params.endpoint;
    teller.pushSubscription.expirationTime = params.expirationTime;
    teller.pushSubscription.keys.auth = params.toJSON().keys.auth;
    teller.pushSubscription.keys.p256dh = params.toJSON().keys.p256dh;
    this.tellersService.save(teller).subscribe((item: Teller) => {
      teller = item;
    });
  }

}


