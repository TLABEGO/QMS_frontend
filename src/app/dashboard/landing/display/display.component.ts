import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Pipe, ViewChild} from '@angular/core';
import {TicketsService} from '../../tickets/tickets.service';
import {ActivatedRoute} from '@angular/router';
import {BranchesService} from '../../branches/branches.service';
import {TellersService} from '../../tellers/tellers.service';
import {Teller} from '../../tellers/teller/teller';
import {Ticket} from '../../tickets/ticket/ticket';
import Speech from 'speak-tts';
import {DisplayInformationsService} from '../../display-informations/display-informations.service';
import {Results} from '../../../core/results';
import {DisplayInformation} from '../../display-informations/display-information/display-information';
import {ConfigService} from '../../../core/config.service';
import {Title} from '@angular/platform-browser';
import {DevicesService} from '../../connectivity/devices.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {DeviceInfo} from 'ngx-device-detector/lib/device-detector.service';
import {DeviceConnectivity} from '../../connectivity/devices/device';
import {Branch} from '../../branches/branch/branch';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent implements OnInit, OnDestroy {

  muted: string = '';
  branch: Branch;
  public date: Date = new Date();
  branchId: string;
  deviceId: string = '';
  loadingDone: boolean = false;
  tellers: Array<Teller>;
  servicing: Map<string, Ticket> = new Map<string, Ticket>();
  top10: Map<string, Array<Ticket>> = new Map<string, Array<Ticket>>();
  top10PerService: Map<string, Array<Ticket>> = new Map<string, Array<Ticket>>();
  totalWaiting: Map<string, number> = new Map<string, number>();
  public results: Array<DisplayInformation>;

  constructor(public ticketsService: TicketsService,
              public branchesService: BranchesService,
              public tellersService: TellersService,
              public title: Title,
              public displayInformationsService: DisplayInformationsService,
              public configService: ConfigService,
              public route: ActivatedRoute,
              public cdRef: ChangeDetectorRef,
              public devicesService: DevicesService) {

  }

  getNumber(name: string): number {
    const num = name.replace(/^\D+/g, '');
    return parseInt(num, 10);
  }

  search() {

    this.loadingDone = false;
    const that = this;
    this.tellersService.searchByBranch(1, 100, 'ASC', 'name', '', this.branchId).subscribe((results: Results) => {
      this.tellers = results.content;
      if (!this.branch.sort || this.branch.sort === 'Numeric') {
        this.tellers.sort((a, b) => (this.getNumber(a.name) > this.getNumber(b.name) ? 1 : -1));
      }
      this.tellers.forEach((teller: Teller) => {
        that.ticketsService.getServicingByTeller(teller.id).subscribe((ticket: Ticket) => {
          that.servicing.set(teller.id, ticket);
        });
        that.ticketsService.searchWaitingByTeller(1, 5, 'ASC', 'createDate', teller.id).subscribe((ret: Results) => {
          that.top10.set(teller.id, ret.content);
          that.top10PerService.set(teller.service.name, ret.content);
          that.totalWaiting.set(teller.service.name, ret.totalElements);
          that.loadingDone = true;
          that.cdRef.detectChanges();
        });

      });

    });

  }

  getDeviceId(): string {
    this.deviceId = localStorage.getItem('deviceId');
    return localStorage.getItem('deviceId');
  }


  ngOnInit() {


    const speech = new Speech();
    if (speech.hasBrowserSupport()) {
      console.log('speech synthesis supported');
      speech.init({
        volume: 1,
        lang: 'en-GB',
        rate: 1,
        pitch: 1,
        voice: 'Google UK English Female',
        splitSentences: true
      }).then((data) => {
        console.log('Speech is ready, voices are available', data);
      }).catch(e => {
        console.error('An error occured while initializing : ', e);
      });
    }
    const that = this;

    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.branchId = params.id;

          if (!localStorage.getItem('deviceId')) {
            localStorage.setItem('deviceId', new Date().getTime() + '_' + this.branchId + '_' + Math.random().toString(36).substr(2, 100));
          }

          this.displayInformationsService.searchByBranchAndStatus(1, 1, 'DESC', 'createDate', '', this.branchId, 'Active').subscribe((results: Results) => {
            this.results = results.content;
          });
          this.branchesService.get(this.branchId).subscribe((branch: Branch) => {
            that.branch = branch;
            this.search();
            that.title.setTitle(branch.name);
          });
          this.ticketsService.subscribe(params.id);
          this.ticketsService.subject.onmessage = (evt) => {
            that.devicesService.getPing(that.getDeviceId(), that.branchId, 'NewTicket').subscribe(() => {
            }, error => {
              console.log(error);
            });
            const ticket = JSON.parse(evt.data);
            if (ticket.status === 'SERVICING') {
              this.muted = 'muted';
              const tet = 'Ticket number ' + ticket.reference + ' to ' + ticket.teller.name;
              speech.speak({
                text: tet,
                queue: true,
                listeners: {
                  onerror: () => {
                    that.devicesService.getPing(that.getDeviceId(), that.branchId, 'SpeechError').subscribe(() => {
                    }, error => {
                      console.log(error);
                    });
                  },
                  onstart: () => {
                    that.muted = 'muted';
                    that.devicesService.getPing(that.getDeviceId(), that.branchId, 'SpeechStart').subscribe(() => {
                    }, error => {
                      console.log(error);
                    });
                  },
                  onend: () => {
                    that.muted = '';
                    that.devicesService.getPing(that.getDeviceId(), that.branchId, 'SpeechEnd').subscribe(() => {
                    }, error => {
                      console.log(error);
                    });
                  },
                  onresume: () => {
                    that.devicesService.getPing(that.getDeviceId(), that.branchId, 'SpeechResume').subscribe(() => {
                    }, error => {
                      console.log(error);
                    });
                  },
                  onboundary: (event) => {
                    that.devicesService.getPing(that.getDeviceId(), that.branchId, 'SpeechBoundary').subscribe(() => {
                    }, error => {
                      console.log(error);
                    });
                  }
                }
              }).then(() => {
                this.muted = '';
              }).catch(e => {
                this.muted = '';
                console.log('An error occurred :', e);
              });
            }
            this.search();
          };
          this.ticketsService.subject.onopen = (evt) => {
            that.devicesService.getPing(that.getDeviceId(), that.branchId, 'SubscriptionOpened').subscribe(() => {
            }, error => {
              console.log(error);
            });
          };
          this.ticketsService.subject.onerror = (evt) => {
            that.devicesService.getPing(that.getDeviceId(), that.branchId, 'SubscriptionError').subscribe(() => {
            }, error => {
              console.log(error);
            });
          };
          this.ticketsService.subject.onclose = (evt) => {
            that.devicesService.getPing(that.getDeviceId(), that.branchId, 'SubscriptionClosed').subscribe(() => {
            }, error => {
              console.log(error);
            });
          };
        }
      }
    });

  }

  ngOnDestroy(): void {
    this.ticketsService.subject.close();
  }
}
