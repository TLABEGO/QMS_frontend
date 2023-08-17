import {Directive, ElementRef, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Ticket} from '../../dashboard/tickets/ticket/ticket';

declare var bootbox: any;
declare var $: any;
declare var moment: any;
export const CUSTOM_INPUT_DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ClockPickerDirective),
  multi: true
};


@Directive({
  selector: '[appClockPicker]',
  providers: [CUSTOM_INPUT_DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class ClockPickerDirective {

  private innerValue: string;
  private selectedDay: string;
  private currentDay: string;
  @Input('ticket') ticket: Ticket;
  private dt: Date;

  @Input() set date(value: Date) {

    this.dt = value;
    this.selectedDay = moment(value).format('DD MMM YYYY');
    this.currentDay = moment(new Date()).format('DD MMM YYYY');
    this.init();
  }

  get date(): Date {

    return this.dt;

  }

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    const that = this;
    $(this.el.nativeElement).timepicker({
      timeFormat: 'HH:mm',
      interval: 30,
      minTime:  '9:00am',
      maxTime: '3:00pm',
      startTime: '09:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true,
      change: function(e) {
        const date = moment(that.ticket.createDate).format('DD MMMM YYYY') + ' ' + moment(e).format('HH:mm');
        that.ticket.createDate = moment(date, 'DD MMMM YYYY HH:mm').toDate();
        that.onChange(e);
      }
    });
  }

  init() {
    $(this.el.nativeElement).timepicker('option',  'minTime', this.selectedDay === this.currentDay ? moment(new Date()).format('h:mm a') : '9:00am' );
  }

  public onChange: any = (_: any) => { /*Empty*/
  };
  public onTouched: any = () => { /*Empty*/
  };

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
    }
  }


  writeValue(val: string): void {
    this.innerValue = val;
  }

  registerOnChange(fn: any): void {

    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


}
