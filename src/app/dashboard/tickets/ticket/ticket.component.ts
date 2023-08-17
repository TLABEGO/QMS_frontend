import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';
import {Ticket} from './ticket';
import {TicketsService} from '../tickets.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent extends CoreComponent implements OnInit {

  public item: Ticket;

  constructor(public meta: Meta,
              public title: Title,
              public ticketsService: TicketsService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(ticketsService, toasterService, route, location);
    this.title.setTitle('Ticket Details');
  }

  setStatus(status: string) {
    this.item.status = status;
  }

  public ngOnInit(): void {

    this.item = new Ticket();
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      }
    });

  }
}
