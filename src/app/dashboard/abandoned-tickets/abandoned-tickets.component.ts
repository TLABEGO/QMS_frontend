import {Component, OnInit} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Ticket} from '../tickets/ticket/ticket';
import {Meta, Title} from '@angular/platform-browser';
import {TicketsService} from '../tickets/tickets.service';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ReportForm} from '../report/report.form';
import {UsersService} from '../users/users.service';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Results} from '../../core/results';
import {HttpErrorResponse} from '@angular/common/http';
declare var moment: any;
declare var bootbox: any;

@Component({
  selector: 'app-abandoned-tickets',
  templateUrl: './abandoned-tickets.component.html',
  styleUrls: ['./abandoned-tickets.component.css']
})
export class AbandonedTicketsComponent extends CoreComponent {

  public keyword: string = 'ABANDON';
  public reportForm: ReportForm = new ReportForm();
  public results: Array<Ticket>;
  public start: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth(),1);
  public end: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

  constructor(public meta: Meta,
              public title: Title,
              public ticketsService: TicketsService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public usersService: UsersService,
              public route: ActivatedRoute,
              public location: Location) {
    super(ticketsService, toasterService, route, location);
    this.title.setTitle('Abandoned Tickets');
  }

  remove(ticket: Ticket) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + ticket.status,
      message: 'Are you sure you want to delete ' + ticket.status,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.ticketsService.delete(ticket.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a ticket', 'ticket successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

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
