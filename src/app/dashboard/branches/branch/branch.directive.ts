import {Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BranchesService} from '../branches.service';
import {Results} from '../../../core/results';
import {Branch} from './branch';
declare var $: any;
@Directive({
  selector: '[appBranch]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BranchDirective),
    multi: true
  }]
})
export class BranchDirective implements ControlValueAccessor, OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() private branch: Branch;
  @Input() private disabled = false;
  public title: string;
  select2: any;

  constructor(private el: ElementRef, private branchesService: BranchesService) {

    this.title = el.nativeElement.getAttribute('title');
  }

  ngOnInit(): void {

    const that = this;
    this.select2 = $(this.el.nativeElement).select2({
      allowClear: true,
      width: '50%',
      placeholder: this.title === undefined || this.title === null ? 'Select Customer Care Center' : this.title,
      ajax: {
        transport: function(params, success, failure) {
          const page = 1;
          const perPage = 10;
          that.branchesService.search(page, perPage, 'ASC', 'name', params.data.term).subscribe((ret: Results) => {
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

      that.branch = JSON.parse(e.params.data.id);
      that.propagateChange(that.branch);
      that.onSelect.emit();

    });

    $(this.el.nativeElement).on('select2:unselect', function(e) {

      that.branch = null;
      that.propagateChange(that.branch);
      that.onSelect.emit();
    });


  }

  onTouched = () => {
  };

  propagateChange = (_: any) => {
  };

  writeValue(branch: Branch): void {

    this.branch = branch;
    this.propagateChange(this.branch);
    const that = this;
    if (this.branch !== undefined && this.branch !== null) {
      const option = new Option(branch.name, JSON.stringify(branch), true, true);
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
    return this.branch;
  }

  set value(v: any) {
    if (v !== this.branch) {
      this.branch = v;
      this.propagateChange(v);
    }
  }
}
