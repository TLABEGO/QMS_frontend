import {Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Results} from '../../../core/results';
import {TicketsService} from '../tickets.service';
import {Ticket} from './ticket';
import {Branch} from '../../branches/branch/branch';

declare var $: any;

@Directive({
  selector: '[appTicket]'
  ,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TicketDirective),
    multi: true
  }]
})
export class TicketDirective implements ControlValueAccessor, OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() private branch: Branch;
  @Input() private ticket: Ticket;
  @Input() private disabled = false;
  public title: string;
  select2: any;

  constructor(private el: ElementRef, private ticketsService: TicketsService) {

    this.title = el.nativeElement.getAttribute('title');
  }

  ngOnInit(): void {

    const that = this;
    this.select2 = $(this.el.nativeElement).select2({
      allowClear: true,
      width: '50%',
      placeholder: this.title === undefined || this.title === null ? 'Select Ticket' : this.title,
      ajax: {
        transport: function(params, success, failure) {
          const page = 1;
          const perPage = 10;
          that.ticketsService.searchByBranch(page, perPage, 'DESC', 'createDate', params.data.term, that.branch.id).subscribe((ret: Results) => {
            success(ret);
          });

        },
        dataType: 'json',
        type: 'GET',
        processResults: function(data) {
          const arr = [];
          data.content.forEach(function(obj) {
            arr.push({
              id: JSON.stringify(obj),
              text: obj.reference
            });
          });
          return {
            results: arr
          };
        }
      }
    });
    $(this.el.nativeElement).on('select2:select', function(e) {

      that.ticket = JSON.parse(e.params.data.id);
      that.propagateChange(that.ticket);
      that.onSelect.emit();

    });

    $(this.el.nativeElement).on('select2:unselect', function(e) {

      that.ticket = null;
      that.propagateChange(that.ticket);
      that.onSelect.emit();
    });


  }

  onTouched = () => {};

  propagateChange = (_: any) => {};

  writeValue(tic: Ticket): void {

    this.ticket = tic;
    this.propagateChange(this.ticket);
    const that = this;
    if (this.ticket !== undefined && this.ticket !== null) {
      const option = new Option(tic.reference, JSON.stringify(tic), true, true);
      that.select2.append(option);
      that.select2.trigger('change');
    }

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get value(): any {
    return this.ticket;
  }

  set value(v: any) {
    if (v !== this.ticket) {
      this.ticket = v;
      this.propagateChange(v);
    }
  }
}
