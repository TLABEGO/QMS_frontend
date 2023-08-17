import {Component, OnInit} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Entry} from '../../dashboard/entries/entry/entry';
import {Meta, Title} from '@angular/platform-browser';
import {EntriesService} from '../../dashboard/entries/entries.service';
import {UsersService} from '../../dashboard/users/users.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../core/config.service';
import {Location} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';

declare var bootbox: any;

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent extends CoreComponent implements OnInit {

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
    const that = this;
    this.route.queryParams.subscribe(params => {
      that.item.user.firstName = params['firstName'] ? params['firstName'] : '';
      that.item.user.lastName = params['lastName'] ? params['lastName'] : '';
      that.item.user.contactNumber = params['contactNumber'] ? params['contactNumber'] : '';
      that.item.user.email = params['email'] ? params['email'] : '';
      that.item.user.idNumber = params['idNumber'] ? params['idNumber'] : '';
    });

  }

  public onSubmit() {

    let message = '';
    let valid = true;
    if (!this.item.preExistingMedicalConditions) {
      message += '<p>Any other pre-existing medical conditions</p>';
      valid = false;
    }
    if (!this.item.feelingHotOrCold) {
      message += '<p>Are you sweating or shivering?</p>';
      valid = false;
    }
    if (!this.item.recentCough) {
      message += '<p>Do you have a cough that recently started?</p>';
      valid = false;
    }
    if (!this.item.soreThroat) {
      message += '<p>Do you have a sore throat or pain when swallowing?</p>';
      valid = false;
    }
    if (!this.item.diarrhoea) {
      message += '<p>Do you have diarrhoea?</p>';
      valid = false;
    }
    if (!this.item.difficultyBreathing) {
      message += '<p>Do you have difficulty breathing?</p>';
      valid = false;
    }
    if (!this.item.lostTasteOrSmell) {
      message += '<p>Have you noticed any recent changes in your ability to taste or smell things?</p>';
      valid = false;
    }
    if (!this.item.generalBodyPains) {
      message += '<p>Do you have general body pains?</p>';
      valid = false;
    }
    if (!this.item.contactedInfectedPerson) {
      message += '<p>Have you been in close contact to someone confirmed to be infected with COVID19?</p>';
      valid = false;
    }
    if (!valid) {
      bootbox.confirm({
        title: 'Please complete the outstanding questions',
        message: message,
        callback: function(res) {
          return;
        }
      });
      return;
    }
    this.blockUI.start('Loading');
    this.entriesService.checkFlagged(this.item).subscribe((result: boolean) => {

      if (result === false) {
        this.entriesService.save(this.item).subscribe((data: Entry) => {
          this.toasterService.pop('success', 'Saved', 'Details saved successfully');
          this.item = data;
          this.blockUI.stop();
        }, (error: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toasterService.pop('error', 'Error', error.error.message);
        });
      } else {
        this.blockUI.stop();
        bootbox.confirm({
          title: 'Flagged ' + this.item.user === null || this.item.user === undefined ? '-' : this.item.user.firstName,
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

}
