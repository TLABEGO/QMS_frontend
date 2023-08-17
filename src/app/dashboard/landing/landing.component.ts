import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Ticket} from '../tickets/ticket/ticket';
import {User} from '../users/user/user';
import {Meta, Title} from '@angular/platform-browser';
import {TicketsService} from '../tickets/tickets.service';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent extends CoreComponent {

  public results: Array<Ticket>;
  public user: User;

  constructor(public meta: Meta,
              public title: Title,
              public ticketsService: TicketsService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public location: Location) {
    super(ticketsService, toasterService, route, location);
    this.title.setTitle('Track Tickets');
  }

  public ngOnInit(): void {


  }



}
