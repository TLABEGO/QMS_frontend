import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TellersService} from '../../dashboard/tellers/tellers.service';
import {Title} from '@angular/platform-browser';
import {DisplayInformationsService} from '../../dashboard/display-informations/display-informations.service';
import {ConfigService} from '../../core/config.service';
import {TicketsService} from '../../dashboard/tickets/tickets.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ServicesService} from '../../dashboard/services/services.service';
import {Service} from '../../dashboard/services/service/service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {Ticket} from '../../dashboard/tickets/ticket/ticket';
import {User} from '../../dashboard/users/user/user';
import {EntriesService} from '../../dashboard/entries/entries.service';
import {Entry} from '../../dashboard/entries/entry/entry';

declare var $: any;

@Component({
  selector: 'app-mobile-select-date',
  templateUrl: './mobile-select-date.component.html',
  styleUrls: ['./mobile-select-date.component.css']
})
export class MobileSelectDateComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public dt: Date = new Date();
  public time: string;
  public name = '';
  public id = '';
  public contactNumber = '';
  public email = '';
  public entryId = null;
  public idNumber = '';
  public ticket: Ticket = new Ticket();
  public service: Service;

  constructor(public servicesService: ServicesService,
              public tellersService: TellersService,
              public entriesService: EntriesService,
              public title: Title,
              public displayInformationsService: DisplayInformationsService,
              public configService: ConfigService,
              public ticketsService: TicketsService,
              public cdRef: ChangeDetectorRef,
              public route: ActivatedRoute,
              public router: Router) {
  }

  ngOnInit() {
    const that = this;
    that.ticket.client = new User();
    this.route.queryParams.subscribe(params => {
      that.id = params['id'] ? params['id'] : null;
      that.entryId = params['entryId'] ? params['entryId'] : null;
      that.name = params['name'] ? params['name'] : '';
      that.contactNumber = params['contactNumber'] ? params['contactNumber'] : '';
      that.email = params['email'] ? params['email'] : '';
      that.idNumber = params['idNumber'] ? params['idNumber'] : '';
      that.ticket.client.id = that.id;
      that.ticket.client.firstName = that.name;
      that.ticket.client.contactNumber = that.contactNumber;
      that.ticket.client.email = that.email;
      that.ticket.client.idNumber = that.idNumber;
    });

    if (this.entryId != null && this.entryId) {
      this.entriesService.get(this.entryId).subscribe((entry: Entry) => {
        this.ticket.entry = entry;
      });
    }

    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.blockUI.start('Loading');
          this.servicesService.get(params.id).subscribe((service: Service) => {
            that.service = service;
            that.ticket.service = service;
            that.ticket.branch = service.branch;
            that.blockUI.stop();
            that.title.setTitle(service.name);
          });
        }
      }
    });
  }


  public onSubmit() {

    $('#fullCalModal').modal('hide');
    this.blockUI.start('Loading');
    this.ticket.branch = this.service.branch;
    this.ticket.service = this.service;
    this.ticketsService.save(this.ticket).subscribe((t: Ticket) => {
      this.blockUI.stop();
      this.router.navigate(['/view/' + t.id]);
    });

  }

}
