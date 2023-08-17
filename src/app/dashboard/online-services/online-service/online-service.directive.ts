import {Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Results} from '../../../core/results';
import {OnlineServicesService} from '../online-services.service';
import {OnlineService} from './online-service';
declare var $: any;
@Directive({
  selector: '[appOnlineService]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OnlineServiceDirective),
    multi: true
  }]
})
export class OnlineServiceDirective implements ControlValueAccessor, OnInit {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() private disabled = false;
  private onlineService: OnlineService;
  public title: string;
  select2: any;

  constructor(private el: ElementRef, private onlineServicesService: OnlineServicesService) {

    this.title = el.nativeElement.getAttribute('title');
  }

  ngOnInit(): void {

    const that = this;
    this.select2 = $(this.el.nativeElement).select2({
      allowClear: true,
      width: '50%',
      placeholder: this.title === undefined || this.title === null ? 'Select Online Service' : this.title,
      ajax: {
        transport: function(params, success, failure) {
          const page = 1;
          const perPage = 10;
          that.onlineServicesService.search(page, perPage, 'ASC', 'name', params.data.term).subscribe((ret: Results) => {
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

      that.onlineService = JSON.parse(e.params.data.id);
      that.propagateChange(that.onlineService);
      that.onSelect.emit();

    });

    $(this.el.nativeElement).on('select2:unselect', function(e) {

      that.onlineService = null;
      that.propagateChange(that.onlineService);
      that.onSelect.emit();
    });


  }

  onTouched = () => {};

  propagateChange = (_: any) => {};

  writeValue(onlineService: OnlineService): void {

    this.onlineService = onlineService;
    this.propagateChange(this.onlineService);
    const that = this;
    if (this.onlineService !== undefined && this.onlineService !== null) {
      const option = new Option(onlineService.name, JSON.stringify(onlineService), true, true);
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
    return this.onlineService;
  }

  set value(v: any) {
    if (v !== this.onlineService) {
      this.onlineService = v;
      this.propagateChange(v);
    }
  }

}
