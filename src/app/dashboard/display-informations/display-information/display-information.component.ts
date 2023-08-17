import {Component, OnInit} from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';
import {DisplayInformationsService} from '../display-informations.service';
import {DisplayInformation} from './display-information';
import {FileUploadService} from '../../../core/file-upload.service';
import {UsersService} from '../../users/users.service';

@Component({
  selector: 'app-display-information',
  templateUrl: './display-information.component.html',
  styleUrls: ['./display-information.component.css']
})
export class DisplayInformationComponent extends CoreComponent implements OnInit {

  public item: DisplayInformation;
  public file: File;

  constructor(public meta: Meta,
              public title: Title,
              public displayInformationsService: DisplayInformationsService,
              public usersService: UsersService,
              public fileUploadService: FileUploadService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(displayInformationsService, toasterService, route, location);
    this.title.setTitle('LCD Display Information Details');
  }


  public ngOnInit(): void {

    this.item = new DisplayInformation();
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      }
    });

  }

}
