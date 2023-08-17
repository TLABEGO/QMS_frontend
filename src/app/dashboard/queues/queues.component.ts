import {Component, OnInit} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {QueuesService} from './queues.service';
import {Queue} from './queue/queue';
import {ReportForm} from '../report/report.form';
import {Ticket} from '../tickets/ticket/ticket';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {TicketsService} from '../tickets/tickets.service';
import {UsersService} from '../users/users.service';
import {Results} from '../../core/results';
import {HttpErrorResponse} from '@angular/common/http';

declare var moment: any;
declare var bootbox: any;

@Component({
  selector: 'app-queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.css']
})
export class QueuesComponent extends CoreComponent {
  public results: Array<Queue>;
  constructor(public meta: Meta,
              public title: Title,
              public queuesService: QueuesService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public usersService: UsersService,
              public route: ActivatedRoute,
              public location: Location) {
    super(queuesService, toasterService, route, location);
    this.title.setTitle('Active Queue');
  }


}
