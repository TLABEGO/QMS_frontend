import {Component, OnInit} from '@angular/core';
import {CoreComponent} from '../core/core.component';
import {Keys, Ticket, WebPushSubscription} from '../dashboard/tickets/ticket/ticket';
import {Meta, Title} from '@angular/platform-browser';
import {TicketsService} from '../dashboard/tickets/tickets.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../core/config.service';
import {Location} from '@angular/common';
import {SwPush} from '@angular/service-worker';
import {HttpErrorResponse} from '@angular/common/http';
import {ClosingReasonsService} from '../dashboard/closing-reasons/closing-reasons.service';
import {ClosingReason} from '../dashboard/closing-reasons/closing-reason/closing-reason';
import {Results} from '../core/results';
import Speech from 'speak-tts';
import {EntriesService} from '../dashboard/entries/entries.service';
import {Entry} from '../dashboard/entries/entry/entry';

declare var bootbox: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent extends CoreComponent implements OnInit {

  public item: Ticket;
  public temperature: number;
  public date: Date = new Date();
  public top10: Array<Ticket>;
  public totalWaiting: number;
  public closingReasons: Array<ClosingReason>;
  readonly VAPID_PUBLIC_KEY = 'BMNxdeUqn69sQTIcyPpff4ja-gZImjG1NqDlGkb688NZBbynEDFs64WH22BwICJ4SI1SMUk5yoempKtg8cf_ql0';

  constructor(public meta: Meta,
              public title: Title,
              public ticketsService: TicketsService,
              public toasterService: ToasterService,
              public entriesService: EntriesService,
              public route: ActivatedRoute,
              public closingReasonsService: ClosingReasonsService,
              public configService: ConfigService,
              public location: Location,
              private swPush: SwPush) {
    super(ticketsService, toasterService, route, location);
    this.title.setTitle('Ticket Details');
  }

  confirmTemperature() {
    const that = this;
    this.item.entry.temperature = this.temperature;
    bootbox.confirm({
      title: 'Confirm your Temperature',
      message: 'Are you sure you current Temperature is ' + this.item.entry.temperature + ' &#8451; ?',
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.entriesService.save(that.item.entry).subscribe((entry: Entry) => {
            that.toasterService.pop('success', 'Saved', 'Thank you');
          });
        }
      }
    });
  }

  close(ticket: Ticket, closingReason: ClosingReason) {

    const that = this;
    bootbox.confirm({
      title: 'Close ticket #' + ticket.reference,
      message: 'Are you sure you want to close ' + ticket.reference + '?',
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          ticket.status = 'ABANDON';
          ticket.closingReason = closingReason;
          that.ticketsService.save(ticket).subscribe(data => {
            that.toasterService.pop('info', 'Close a ticket', 'ticket successfully closed :)');
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

  public search() {

    this.top10 = new Array<Ticket>();
    this.ticketsService.searchWaitingByService(1, 5, 'ASC', 'reference', this.item.service.id).subscribe((ret: Results) => {
      this.top10 = ret.content;
      this.totalWaiting = ret.totalElements;
    });

  }

  loadTicketDetails() {
    this.ticketsService.get(this.item.id).subscribe((data: Ticket) => {
      this.item = data;
    }, (error: HttpErrorResponse) => {
      this.toasterService.pop('error', 'Error', error.error.message);
    });
  }

  public ngOnInit(): void {
    const that = this;
    const speech = new Speech();
    if (speech.hasBrowserSupport()) {
      console.log('speech synthesis supported');
      speech.init({
        volume: 1,
        lang: 'en-GB',
        rate: 1,
        pitch: 1,
        splitSentences: true
      }).then((data) => {
        console.log('Speech is ready, voices are available', data);
      }).catch(e => {
        console.error('An error occured while initializing : ', e);
      });
    }
    this.closingReasonsService.getAll().subscribe((closingReasons: Array<ClosingReason>) => {
      this.closingReasons = closingReasons;
    });

    this.item = new Ticket();
    this.route.params.subscribe(params => {
      if (params.id !== undefined && params.id !== '0') {
        that.blockUI.start('Loading');
        that.ticketsService.get(params.id).subscribe((data: Ticket) => {
          that.blockUI.stop();
          that.item = data;
          that.ticketsService.subscribe(that.item.branch.id);
          that.ticketsService.subject.onmessage = (evt) => {
            const ticket = JSON.parse(evt.data);
            if (ticket.status === 'SERVICING') {
              const tet = 'Ticket number ' + ticket.reference + ' to ' + ticket.teller.name;
              speech.speak({
                text: tet,
                queue: true,
                listeners: {
                  onerror: () => {
                  },
                  onstart: () => {
                  },
                  onend: () => {
                  },
                  onresume: () => {
                  },
                  onboundary: (event) => {
                    console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.');
                  }
                }
              }).then(() => {
              }).catch(e => {
                console.log('An error occurred :', e);
              });
            }
            that.loadTicketDetails();
            that.search();
          };
          that.ticketsService.subject.onopen = (evt) => {
          };
          that.ticketsService.subject.onerror = (evt) => {
          };
          that.ticketsService.subject.onclose = (evt) => {
          };
          that.subscribe();
          that.search();
        }, (error: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toasterService.pop('error', 'Error', error.error.message);
        });


      }
    });

  }

  public subscribe(): void {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then((sub: PushSubscription) => {
      this.sendToServer(sub);
    }, error => {
      //this.toasterService.pop('error', 'Error', error.message);
    }).catch(err => console.error('Could not subscribe to notifications', err));
    this.swPush.notificationClicks.subscribe(event => {
      this.get(this.item.id);
    });
  }

  sendToServer(params: PushSubscription) {
    this.item.pushSubscription = new WebPushSubscription();
    this.item.pushSubscription.keys = new Keys();
    this.item.pushSubscription.endpoint = params.endpoint;
    this.item.pushSubscription.expirationTime = params.expirationTime;
    this.item.pushSubscription.keys.auth = params.toJSON().keys.auth;
    this.item.pushSubscription.keys.p256dh = params.toJSON().keys.p256dh;
    this.ticketsService.save(this.item).subscribe((item: Ticket) => {
      this.item = item;
    });
  }

  download() {

    this.ticketsService.downloadTicket(this.item)
      .subscribe(res => {
        const url = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', this.item.service.name + ' at ' + this.item.branch.name + ' Ekurhuleni Customer Care Centre.ics');
        document.body.appendChild(link);
        link.click();
        this.blockUI.stop();
      }, (error: HttpErrorResponse) => {
        this.blockUI.stop();
        this.toasterService.pop('error', 'Error', error.error.message);
      });
  }

}
