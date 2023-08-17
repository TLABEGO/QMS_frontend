import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {DisplayInformation} from '../../display-informations/display-information/display-information';
import {Meta, Title} from '@angular/platform-browser';
import {DisplayInformationsService} from '../../display-informations/display-informations.service';
import {UsersService} from '../../users/users.service';
import {FileUploadService} from '../../../core/file-upload.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';
import {IntraTv} from './intra-tv';
import {IntraTvsService} from '../intra-tvs.service';

@Component({
  selector: 'app-intra-tv',
  templateUrl: './intra-tv.component.html',
  styleUrls: ['./intra-tv.component.css']
})
export class IntraTvComponent extends CoreComponent implements OnInit {

  public item: IntraTv;
  public file: File;

  constructor(public meta: Meta,
              public title: Title,
              public intraTvsService: IntraTvsService,
              public usersService: UsersService,
              public fileUploadService: FileUploadService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(intraTvsService, toasterService, route, location);
    this.title.setTitle('Intra TVs');
  }


  public ngOnInit(): void {

    this.item = new IntraTv();
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      }
    });

  }


}
