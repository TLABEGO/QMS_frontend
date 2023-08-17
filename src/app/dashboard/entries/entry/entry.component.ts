import {Component, OnInit} from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';
import {EntriesService} from '../entries.service';
import {Entry} from './entry';
import {UsersService} from '../../users/users.service';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../users/user/user';

declare var bootbox: any;

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent extends CoreComponent implements OnInit {

  public item: Entry;

  constructor(public meta: Meta,
              public title: Title,
              public entriesService: EntriesService,
              public usersService: UsersService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(entriesService, toasterService, route, location);
    this.title.setTitle('Entry Details');
  }


  public ngOnInit(): void {

    this.item = new Entry();
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      }
    });

  }

  public onSubmit() {

    this.blockUI.start('Loading');
    this.entriesService.checkFlagged(this.item).subscribe((result: boolean) => {

      if (result === false) {
        this.entriesService.save(this.item).subscribe((data: Entry) => {
          this.toasterService.pop('success', 'Saved', 'Details saved successfully');
          this.item = data;
          this.blockUI.stop();
          this.location.back();
        }, (error: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toasterService.pop('error', 'Error', error.error.message);
        });
      } else {
        this.blockUI.stop();
        bootbox.confirm({
          title: 'Flagged ' + this.item.user === null || this.item.user === undefined ? '-' : this.item.user.firstName ,
          message: this.item.user === null || this.item.user === undefined ? '-' : this.item.user.firstName + ' has been flagged <img  src="assets/images/covid.png" width="10%">',
          callback: function(res) {
            if (result === null) {
            } else if (result === true) {
            }
          }
        });
      }
    });

  }

  public get(id: string) {

    this.blockUI.start('Loading');
    this.entriesService.get(id).subscribe((data: Entry) => {
      this.blockUI.stop();
      this.item = data;
      if (this.item.user === null || this.item.user === undefined) {
        this.item.user = new User();
      }
    }, (error: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toasterService.pop('error', 'Error', error.error.message);
    });
  }
}
