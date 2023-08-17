import {Directive, ElementRef, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {RedirectReason} from './redirect-reason';
import {RedirectReasonsService} from '../redirect-reasons.service';
import {Results} from '../../../core/results';
declare var $: any;
@Directive({
  selector: '[appRedirectReason]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RedirectReasonDirective),
    multi: true
  }]
})
export class RedirectReasonDirective  implements ControlValueAccessor, OnInit {

  @Input() private redirectReason: RedirectReason;
  @Input() private disabled = false;
  public title: string;
  select2: any;

  constructor(private el: ElementRef, private redirectReasonsService: RedirectReasonsService) {

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
          that.redirectReasonsService.search(page, perPage, 'ASC', 'name', params.data.term).subscribe((ret: Results) => {
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

      that.redirectReason = JSON.parse(e.params.data.id);
      that.propagateChange(that.redirectReason);

    });

    $(this.el.nativeElement).on('select2:unselect', function(e) {

      that.redirectReason = null;
      that.propagateChange(that.redirectReason);
    });


  }

  onTouched = () => {
  };

  propagateChange = (_: any) => {
  };

  writeValue(redirectReason: RedirectReason): void {

    this.redirectReason = redirectReason;
    this.propagateChange(this.redirectReason);
    const that = this;
    if (this.redirectReason !== undefined && this.redirectReason !== null) {
      const option = new Option(redirectReason.name, JSON.stringify(redirectReason), true, true);
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
    return this.redirectReason;
  }

  set value(v: any) {
    if (v !== this.redirectReason) {
      this.redirectReason = v;
      this.propagateChange(v);
    }
  }
}

