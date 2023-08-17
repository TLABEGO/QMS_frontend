import {Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ClosingReason} from './closing-reason';
import {Results} from '../../../core/results';
import {ClosingReasonsService} from '../closing-reasons.service';
import {Service} from '../../services/service/service';
declare var $: any;
@Directive({
  selector: '[appClosingReason]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ClosingReasonDirective),
    multi: true
  }]
})
export class ClosingReasonDirective implements ControlValueAccessor, OnInit {

  @Input() private closingReason: ClosingReason;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() private service: Service;
  @Input() private disabled = false;
  @Input() private branchId: string;
  public title: string;
  select2: any;

  constructor(private el: ElementRef, private closingReasonsService: ClosingReasonsService) {

    this.title = el.nativeElement.getAttribute('title');
  }

  ngOnInit(): void {

    const that = this;
    this.select2 = $(this.el.nativeElement).select2({
      width: '50%',
      allowClear: true,
      placeholder: this.title === undefined || this.title === null ? 'Select Closing Reason' : this.title,
      ajax: {
        transport: function(params, success, failure) {
          const page = 1;
          const perPage = 10;

          if (that.branchId === null || that.branchId === '') {
            that.closingReasonsService.search(page, perPage, 'ASC', 'name', params.data.term).subscribe((ret: Results) => {
              success(ret);
            });
          } else {
            that.closingReasonsService.searchByBranch(page, perPage, 'ASC', 'name', params.data.term, that.branchId).subscribe((ret: Results) => {
              success(ret);
            });
          }
        },
        dataType: 'json',
        type: 'GET',
        processResults: function(data) {
          const arr = [];
          data.content.forEach(function(obj) {
            arr.push({
              id: JSON.stringify(obj),
              text: obj.name
            });
          });
          return {
            results: arr
          };
        }
      }
    });
    $(this.el.nativeElement).on('select2:select', function(e) {

      that.closingReason = JSON.parse(e.params.data.id);
      that.propagateChange(that.closingReason);
      that.onSelect.emit();

    });

    $(this.el.nativeElement).on('select2:unselect', function(e) {

      that.closingReason = null;
      that.propagateChange(that.closingReason);
      that.onSelect.emit();
    });


  }

  onTouched = () => {
  };

  propagateChange = (_: any) => {
  };

  writeValue(closingReason: ClosingReason): void {

    this.closingReason = closingReason;
    this.propagateChange(this.closingReason);
    const that = this;
    if (this.closingReason !== undefined && this.closingReason !== null) {
      const option = new Option(closingReason.name, JSON.stringify(closingReason), true, true);
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
    return this.closingReason;
  }

  set value(v: any) {
    if (v !== this.closingReason) {
      this.closingReason = v;
      this.propagateChange(v);
    }
  }
}
