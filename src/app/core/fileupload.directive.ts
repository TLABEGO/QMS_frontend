import {Directive, ElementRef, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Image} from './image';
import {ConfigService} from './config.service';
declare var $: any;
@Directive({
  selector: '[appFileupload]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileuploadDirective),
    multi: true
  }]
})
export class FileuploadDirective implements OnInit {

  @Input() private file: Image;

  constructor(private el: ElementRef,  private configService: ConfigService) {
  }

  ngOnInit(): void {

    const that = this;
    $(this.el.nativeElement).fileupload({
      multipart: false,
      dropZone: $(this.el.nativeElement),
      add: function(e, data) {
        const reader = new FileReader();
        reader.onload = function (e: any) {
          that.file = that.configService.getDocument(e.target.result, data.files[0]);
          console.log(that.el.nativeElement.id);
          console.log(that.file);
          that.propagateChange(that.file);
          $(that.el.nativeElement).parent().parent().prev().attr('src', e.target.result);
        };
        reader.readAsDataURL(data.files[0]);
      },
    });
  }
  public onChange: any = (e: any) => {};
  public onTouched: any = () => {};

  propagateChange = (_: any) => {};

  get value(): any {
    return this.file;
  }

  set value(v: any) {

    if (v !== this.file) {
      this.file = v;
      this.propagateChange(v);
    }
  }


  writeValue(val: Image): void {
    this.file = val;
  }



  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
