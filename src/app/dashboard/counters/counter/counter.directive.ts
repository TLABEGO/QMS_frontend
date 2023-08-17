import {Directive, ElementRef, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Counter} from './counter';
import {CountersService} from '../counters.service';
import {Results} from '../../../core/results';
declare var $: any;
@Directive({
  selector: '[appCounter]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterDirective),
    multi: true
  }]
})
export class CounterDirective implements ControlValueAccessor, OnInit {

  @Input() private counter: Counter;
  @Input() private disabled = false;
  public title: string;
  select2: any;

  constructor(private el: ElementRef, private countersService: CountersService) {

    this.title = el.nativeElement.getAttribute('title');
  }

  ngOnInit(): void {

    const that = this;
    this.select2 = $(this.el.nativeElement).select2({
      width: '100%',
      placeholder: this.title === undefined || this.title === null ? 'Select Stakeholder' : this.title,
      ajax: {
        transport: function(params, success, failure) {
          const page = 1;
          const perPage = 10;
          that.countersService.search(page, perPage, 'ASC', 'name', params.data.term).subscribe((ret: Results) => {
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

      that.counter = JSON.parse(e.params.data.id);
      that.propagateChange(that.counter);

    });

    $(this.el.nativeElement).on('select2:unselect', function(e) {

      that.counter = null;
      that.propagateChange(that.counter);
    });


  }

  onTouched = () => {
  };

  propagateChange = (_: any) => {
  };

  writeValue(counter: Counter): void {

    this.counter = counter;
    this.propagateChange(this.counter);
    const that = this;
    if (this.counter !== undefined && this.counter !== null) {
      const option = new Option(counter.name, JSON.stringify(counter), true, true);
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
    return this.counter;
  }

  set value(v: any) {
    if (v !== this.counter) {
      this.counter = v;
      this.propagateChange(v);
    }
  }
}
