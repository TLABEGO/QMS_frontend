import {Directive, ElementRef, forwardRef, Input} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {ConfigService} from '../../core/config.service';
import {CookieService} from 'ngx-cookie-service';
import {Ticket} from '../../dashboard/tickets/ticket/ticket';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

declare var $: any;
declare var moment: any;
declare var bootbox: any;
export const CUSTOM_INPUT_DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MobileSelectDateDirective),
  multi: true
};

@Directive({
  selector: '[appMobileSelectDate]',
  providers: [CUSTOM_INPUT_DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class MobileSelectDateDirective {

  @Input() private item: Ticket;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {

    const that = this;
    const calendar = $(this.el.nativeElement).fullCalendar({
      forceEventDuration: true,
      showNonCurrentDates: false,
      selectable: true,
      selectConstraint: {
        start: $.fullCalendar.moment().subtract(1, 'days'),
        end: $.fullCalendar.moment().startOf('month').add(1, 'month')
      },
      width: '100%',
      dayClick: function(date, jsEvent, view) {
        const startDate = moment(date);
        if (moment().diff(startDate, 'days') > 0) {
          jsEvent.preventDefault();
          return;
        }
        if (startDate.isoWeekday() > 5) {
          bootbox.alert('<h2>Closed on weekends</h2><br/>You have selected a day that is outside the operating hours.<br/><br/><span class="text-muted text-danger text-center"> <strong>Note:</strong> Operating hours are <strong>9:00 - 15:00 Monday - Friday</strong></span>');
          jsEvent.preventDefault();
          return;
        }
        const holiday = '<h2>Closed on public holidays</h2><br/>You have selected a day that is outside the operating hours.<br/><br/><span class="text-muted text-danger text-center"> <strong>Note:</strong> Customer Care Centres are closed on holidays<strong></strong></span>';
        if (startDate.date() === 1 && startDate.month() === 0) {
          bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 21 && startDate.month() === 2) {
          bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 15 && startDate.month() === 3) {
          bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 18 && startDate.month() === 3) {
          bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 27 && startDate.month() === 3) {
          bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 1 && startDate.month() === 4) {
          bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 16 && startDate.month() === 5) {
          bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 9 && startDate.month() === 7) {
          bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 24 && startDate.month() === 8) {
          bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 16 && startDate.month() === 11) {
          bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 24 && startDate.month() === 11) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 25 && startDate.month() === 11) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 26 && startDate.month() === 11) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 27 && startDate.month() === 11) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 28 && startDate.month() === 11) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 29 && startDate.month() === 11) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 30 && startDate.month() === 11) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 31 && startDate.month() === 11) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 1 && startDate.month() === 0) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 2 && startDate.month() === 0) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 3 && startDate.month() === 0) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        } else if (startDate.date() === 4 && startDate.month() === 0) {
          //bootbox.alert(holiday);
          jsEvent.preventDefault();
          return;
        }
        $('#modalTitle').text(date.format('DD MMMM YYYY'));
        $('#fullCalModal').modal('show');
        $('#createDate').val('');
        that.item.createDate = date;
        that.onChange(that.item);
        that.propagateChange(that.item);

      },
      viewRender: function(date, jsEvent, view) {

        $('.fc-prev-button').hide();
        $('.fc-past').html('');
        $('.fc-past').click(function(event) {
          event.preventDefault();
        });
        $('.fc-sat').html('');
        $('.fc-sat').click(function(event) {
          event.preventDefault();
        });

        $('.fc-sun').html('');
        $('.fc-sun').click(function(event) {
          event.preventDefault();
        });

        const year = moment(new Date()).year();
        for (let i = year; i < year + 5; i++) {
          $('td').find('[data-date=\'' + i + '-01-01\']').html('');
          $('td').find('[data-date=\'' + i + '-01-01\']').click(function(event) {
            event.preventDefault();
          });
          $('td').find('[data-date=\'' + i + '-03-21\']').html('');
          $('td').find('[data-date=\'' + i + '-03-21\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-04-15\']').html('');
          $('td').find('[data-date=\'' + i + '-04-15\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-04-18\']').html('');
          $('td').find('[data-date=\'' + i + '-04-18\']').click(function(event) {
            event.preventDefault();
          });
          $('td').find('[data-date=\'' + i + '-04-27\']').html('');
          $('td').find('[data-date=\'' + i + '-04-27\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-05-01\']').html('');
          $('td').find('[data-date=\'' + i + '-05-01\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-06-16\']').html('');
          $('td').find('[data-date=\'' + i + '-06-16\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-08-09\']').html('');
          $('td').find('[data-date=\'' + i + '-08-09\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-09-24\']').html('');
          $('td').find('[data-date=\'' + i + '-09-24\']').click(function(event) {
            event.preventDefault();
          });
          $('td').find('[data-date=\'' + i + '-12-16\']').html('');
          $('td').find('[data-date=\'' + i + '-12-16\']').click(function(event) {
            event.preventDefault();
          });
          $('td').find('[data-date=\'' + i + '-12-25\']').html('');
          $('td').find('[data-date=\'' + i + '-12-25\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-12-26\']').html('');
          $('td').find('[data-date=\'' + i + '-12-26\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-12-27\']').html('');
          $('td').find('[data-date=\'' + i + '-12-27\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-12-28\']').html('');
          $('td').find('[data-date=\'' + i + '-12-28\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-12-29\']').html('');
          $('td').find('[data-date=\'' + i + '-12-29\']').click(function(event) {

            console.log(event);
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-12-30\']').html('');
          $('td').find('[data-date=\'' + i + '-12-30\']').click(function(event) {
            event.preventDefault();
          });

          $('td').find('[data-date=\'' + i + '-12-31\']').html('');
          $('td').find('[data-date=\'' + i + '-12-31\']').click(function(event) {
            event.preventDefault();
          });
        }
        for (let i = 1; i < $('.fc-past').parent().parent().parent().parent().parent().length - 1; i++) {
          $($('.fc-past').parent().parent().parent().parent().parent()[i]).hide();
        }
      },
      eventClick: function(event, jsEvent, view) {

        $('#modalTitle').text(event.createDate.format('DD MMMM YYYY'));
        $('#fullCalModal').modal('show');
        $('#createDate').val(event.createDate.format('DD MMMM YYYY HH:mm'));
        that.item.id = event.id;
        that.item.createDate = event.createDate.format('DD MMMM YYYY HH:mm');
        that.onChange(that.item);
        that.propagateChange(that.item);
      },

    });

  }


  public onChange: any = (_: any) => {
  };
  public onTouched: any = () => {
  };

  get value(): any {
    return this.item;
  }

  set value(v: any) {
    if (v !== this.item) {
      this.item = v;
      this.onChange(v);
    }
  }


  writeValue(val: any): void {
    this.item = val;
    this.propagateChange(this.item);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  propagateChange = (_: any) => {
  };


}
