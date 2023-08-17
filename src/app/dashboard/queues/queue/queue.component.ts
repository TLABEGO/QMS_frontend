import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {Ticket} from '../../tickets/ticket/ticket';
import {Meta, Title} from '@angular/platform-browser';
import {TicketsService} from '../../tickets/tickets.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';
import {Queue} from './queue';
import {QueuesService} from '../queues.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent extends CoreComponent implements OnInit {

  public item: Queue;

  constructor(public meta: Meta,
              public title: Title,
              public queuesService: QueuesService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(queuesService, toasterService, route, location);
    this.title.setTitle('Queue Details');
  }



  public ngOnInit(): void {

    this.item = new Queue();
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      }
    });

  }
}
