import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BranchesService} from '../../dashboard/branches/branches.service';
import {Title} from '@angular/platform-browser';
import {DisplayInformationsService} from '../../dashboard/display-informations/display-informations.service';
import {ConfigService} from '../../core/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Results} from '../../core/results';
import {Ticket} from '../../dashboard/tickets/ticket/ticket';
import {TicketsService} from '../../dashboard/tickets/tickets.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {Service} from '../../dashboard/services/service/service';
import {Branch} from '../../dashboard/branches/branch/branch';
import {ServicesService} from '../../dashboard/services/services.service';

declare var bootbox: any;
declare var $: any;

@Component({
  selector: 'app-mobile-display',
  templateUrl: './mobile-display.component.html',
  styleUrls: ['./mobile-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileDisplayComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  branch: Branch;
  public date: Date = new Date();

  public ticketDate: Date = new Date();
  public branchId: string;
  public loadingDone: boolean = false;
  public totalWaiting: Map<Service, number> = new Map<Service, number>();
  public name = '';
  public contactNumber = '';
  public idNumber = '';
  public email = '';

  constructor(public branchesService: BranchesService,
              public servicesService: ServicesService,
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
    this.route.queryParams.subscribe(params => {
      that.name = params['name'] ? params['name'] : '';
      that.contactNumber = params['contactNumber'] ? params['contactNumber'] : '';
      that.email = params['email'] ? params['email'] : '';
      that.idNumber = params['idNumber'] ? params['idNumber'] : '';
    });
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.blockUI.start('Loading');
          this.branchId = params.id;
          this.branchesService.get(params.id).subscribe((branch: Branch) => {
            that.branch = branch;
            that.title.setTitle(branch.name);
            that.search();
          });
        }
      }
    });
  }


  bootboxContent(service: Service) {

    const that = this;
    const frm_str = '<form id="some-form">'
      + '<h4 class="header green">Please confirm your slot for ' + service.name + ' at <strong>' + this.branch.name + '</strong></h4>'
      + '<div class="form-group">'
      + '<label class="col-sm-5 control-label no-padding-right">Confirm booking Date & Tme</label>'
      + '<span  class="input-icon input-icon-right"><input autocomplete="false" readonly="readonly" id="date" name="date" class="date" type="text" id="form-field-icon-2"><i class="ace-icon fa fa-calendar green"></i></span>'
      + '</div>'
      + '</form>';

    const object = $('<div/>').html(frm_str).contents();
    const data = object.find('.date').datetimepicker({
      defaultDate: new Date(),
      beforeShowDay: $.datepicker.noWeekends,
      minDate: new Date(),
      onClose: function(dateText, inst) {
        that.ticketDate = new Date(dateText);
      },
    }).on('changeDate', function(ev) {
      $(this).blur();
      $(this).datetimepicker('hide');
    });
    return object;
  }

  printTicket(service: Service) {

    const that = this;
    bootbox.confirm({
      title: 'Confirm ' + service,
      message: this.bootboxContent(service),
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          const ticket = new Ticket();
          ticket.createDate = that.ticketDate;
          ticket.branch = that.branch;
          that.blockUI.start('Loading');
          that.ticketsService.save(ticket).subscribe((t: Ticket) => {
            that.blockUI.stop();
            that.cdRef.detectChanges();
            that.router.navigate(['/view/' + t.id]);
          });
        }
      }
    });
  }

  selectService(service: Service) {

    const that = this;
    if (service.onlineService && service.onlineService.id) {
      bootbox.confirm({
        title: '<i class="fa fa-info"></i> ' + service.onlineService.name,
        message: service.onlineService.description,
        buttons: {
          confirm: {
            label: 'Try ' + service.onlineService.name,
            className: 'btn-success'
          },
          cancel: {
            label: 'Continue booking',
            className: 'btn-warning'
          }
        },
        callback: function(result) {
          if (result === null) {
          } else if (result === true) {
            window.location.href = service.onlineService.url;
          } else if (result === false) {
            if (service.branch && service.branch.enableCovidScreening) {
              that.router.navigate(['/mobile-booking-covid/' + service.id], {
                queryParams: {
                  name: that.name,
                  contactNumber: that.contactNumber,
                  email: that.email,
                  idNumber: that.idNumber
                }
              });
            } else {
              that.router.navigate(['/mobile-select-date/' + service.id], {
                queryParams: {
                  name: that.name,
                  contactNumber: that.contactNumber,
                  email: that.email,
                  idNumber: that.idNumber
                }
              });
            }

          }
        }
      });
    } else {
      if (service.branch && service.branch.enableCovidScreening) {
        that.router.navigate(['/mobile-booking-covid/' + service.id], {
          queryParams: {
            name: that.name,
            contactNumber: that.contactNumber,
            email: that.email,
            idNumber: that.idNumber
          }
        });
      } else {
        that.router.navigate(['/mobile-select-date/' + service.id], {
          queryParams: {
            name: that.name,
            contactNumber: that.contactNumber,
            email: that.email,
            idNumber: that.idNumber
          }
        });
      }
    }

  }

  search() {
    this.loadingDone = false;
    const that = this;
    let count = 0;
    this.servicesService.searchByBranch(1, 100, 'ASC', 'description', '', this.branchId).subscribe((results: Results) => {
      results.content.forEach((service: Service) => {
        that.ticketsService.searchWaitingByServiceAllDate(1, 1, 'ASC', 'createDate', service.id).subscribe((ret: Results) => {
          that.totalWaiting.set(service, ret.totalElements);
          count++;
          if (count === results.totalElements) {
            that.blockUI.stop();
            that.cdRef.detectChanges();
          }
        });
      });
    });
  }

}
