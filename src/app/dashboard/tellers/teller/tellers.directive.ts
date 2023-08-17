import {Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Teller} from './teller';
import {TellersService} from '../tellers.service';
import {Results} from '../../../core/results';
declare var $: any;
@Directive({
  selector: '[appTellers]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TellersDirective),
    multi: true
  }]
})
export class TellersDirective  implements ControlValueAccessor, OnInit {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() private teller: Teller;
  @Input() private disabled = false;
  @Input() private branchId: string;
  public title: string;
  select2: any;

  constructor(private el: ElementRef, private tellersService: TellersService) {

    this.title = el.nativeElement.getAttribute('title');
  }

  ngOnInit(): void {
    const that = this;
    this.select2 = $(this.el.nativeElement).select2({
      allowClear: true,
      width: '50%',
      placeholder: this.title === undefined || this.title === null ? 'Select Teller' : this.title,
      ajax: {
        transport: function(params, success, failure) {
          const page = 1;
          const perPage = 10;
          that.tellersService.searchByBranch(page, perPage, 'ASC', 'name', params.data.term, that.branchId).subscribe((ret: Results) => {
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

      that.teller = JSON.parse(e.params.data.id);
      that.propagateChange(that.teller);
      that.onSelect.emit();

    });

    $(this.el.nativeElement).on('select2:unselect', function(e) {

      that.teller = null;
      that.propagateChange(that.teller);
      that.onSelect.emit();
    });


  }

  onTouched = () => {
  };

  propagateChange = (_: any) => {
  };

  writeValue(teller: Teller): void {

    this.teller = teller;
    this.propagateChange(this.teller);
    const that = this;
    if (this.teller !== undefined && this.teller !== null) {
      const option = new Option(teller.name, JSON.stringify(teller), true, true);
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
    return this.teller;
  }

  set value(v: any) {
    if (v !== this.teller) {
      this.teller = v;
      this.propagateChange(v);
    }
  }
}
