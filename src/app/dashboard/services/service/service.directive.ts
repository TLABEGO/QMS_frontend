import {Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Results} from '../../../core/results';
import {ServicesService} from '../services.service';
import {Service} from './service';

declare var $: any;

@Directive({
  selector: '[appService]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ServiceDirective),
    multi: true
  }]
})
export class ServiceDirective implements ControlValueAccessor, OnInit {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() private service: Service;
  @Input() private disabled = false;
  @Input() private branchId: string;
  public title: string;
  select2: any;

  constructor(private el: ElementRef, private servicesService: ServicesService) {

    this.title = el.nativeElement.getAttribute('title');
  }

  ngOnInit(): void {

    const that = this;
    this.select2 = $(this.el.nativeElement).select2({
      allowClear: true,
      width: '50%',
      placeholder: this.title === undefined || this.title === null ? 'Select Service' : this.title,
      ajax: {
        transport: function(params, success, failure) {
          const page = 1;
          const perPage = 10;
          if (that.branchId === null || that.branchId === '') {
            that.servicesService.search(page, perPage, 'ASC', 'name', params.data.term).subscribe((ret: Results) => {
              success(ret);
            });
          } else {
            that.servicesService.searchByBranch(page, perPage, 'ASC', 'name', params.data.term, that.branchId).subscribe((ret: Results) => {
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

      that.service = JSON.parse(e.params.data.id);
      that.propagateChange(that.service);
      that.onSelect.emit();
    });

    $(this.el.nativeElement).on('select2:unselect', function(e) {

      that.service = null;
      that.propagateChange(that.service);
      that.onSelect.emit();
    });


  }

  onTouched = () => {
  };

  propagateChange = (_: any) => {
  };

  writeValue(service: Service): void {

    this.service = service;
    this.propagateChange(this.service);
    const that = this;
    if (this.service !== undefined && this.service !== null) {
      const option = new Option(service.name, JSON.stringify(service), true, true);
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
    return this.service;
  }

  set value(v: any) {
    if (v !== this.service) {
      this.service = v;
      this.propagateChange(v);
    }
  }
}
