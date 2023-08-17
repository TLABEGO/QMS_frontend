import {Directive, ElementRef, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DisplayInformation} from './display-information';
import {DisplayInformationsService} from '../display-informations.service';
import {Results} from '../../../core/results';
declare var $: any;
@Directive({
  selector: '[appDisplayInformation]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DisplayInformationDirective),
    multi: true
  }]
})
export class DisplayInformationDirective implements ControlValueAccessor, OnInit {

  @Input() private displayInformation: DisplayInformation;
  @Input() private disabled = false;
  public title: string;
  select2: any;

  constructor(private el: ElementRef, private displayInformationsService: DisplayInformationsService) {

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
          that.displayInformationsService.search(page, perPage, 'ASC', 'shortDescription', params.data.term).subscribe((ret: Results) => {
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
              text: obj.firstName + ' ' + obj.lastName
            });
          });
          return {
            results: arr
          };
        }
      }
    });
    $(this.el.nativeElement).on('select2:select', function(e) {

      that.displayInformation = JSON.parse(e.params.data.id);
      that.propagateChange(that.displayInformation);

    });

    $(this.el.nativeElement).on('select2:unselect', function(e) {

      that.displayInformation = null;
      that.propagateChange(that.displayInformation);
    });


  }

  onTouched = () => {
  };

  propagateChange = (_: any) => {
  };

  writeValue(displayInformation: DisplayInformation): void {

    this.displayInformation = displayInformation;
    this.propagateChange(this.displayInformation);
    const that = this;
    if (this.displayInformation !== undefined && this.displayInformation !== null) {
      const option = new Option(displayInformation.shortDescription, JSON.stringify(displayInformation), true, true);
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
    return this.displayInformation;
  }

  set value(v: any) {
    if (v !== this.displayInformation) {
      this.displayInformation = v;
      this.propagateChange(v);
    }
  }
}
