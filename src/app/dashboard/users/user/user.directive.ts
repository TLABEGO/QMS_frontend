import {Directive, ElementRef, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {User} from './user';
import {UsersService} from '../users.service';
import {Results} from '../../../core/results';
declare var $: any;
@Directive({
  selector: '[appUser]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UserDirective),
    multi: true
  }]
})
export class UserDirective  implements ControlValueAccessor, OnInit {

  @Input() private user: User;
  @Input() private disabled = false;
  public title: string;
  select2: any;

  constructor(private el: ElementRef, private usersService: UsersService) {

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
          that.usersService.search(page, perPage, 'ASC', 'firstName', params.data.term).subscribe((ret: Results) => {
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

      that.user = JSON.parse(e.params.data.id);
      that.propagateChange(that.user);

    });

    $(this.el.nativeElement).on('select2:unselect', function(e) {

      that.user = null;
      that.propagateChange(that.user);
    });


  }

  onTouched = () => {
  };

  propagateChange = (_: any) => {
  };

  writeValue(user: User): void {

    this.user = user;
    this.propagateChange(this.user);
    const that = this;
    if (this.user !== undefined && this.user !== null) {
      const option = new Option(user.firstName + ' ' + user.lastName, JSON.stringify(user), true, true);
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
    return this.user;
  }

  set value(v: any) {
    if (v !== this.user) {
      this.user = v;
      this.propagateChange(v);
    }
  }
}
