import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {Service} from '../../services/service/service';
import {Meta, Title} from '@angular/platform-browser';
import {ServicesService} from '../../services/services.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';
import {Teller} from './teller';
import {TellersService} from '../tellers.service';

@Component({
  selector: 'app-teller',
  templateUrl: './teller.component.html',
  styleUrls: ['./teller.component.css']
})
export class TellerComponent extends CoreComponent implements OnInit {

  public item: Teller;

  constructor(public meta: Meta,
              public title: Title,
              public tellersService: TellersService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(tellersService, toasterService, route, location);
    this.title.setTitle('Teller Details');
  }


  public ngOnInit(): void {

    this.item = new Teller();
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      }
    });

  }
}
