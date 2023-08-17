import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {BranchesService} from '../../branches/branches.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';
import {Service} from '../../services/service/service';
import {ClosingReason} from './closing-reason';
import {ClosingReasonsService} from '../closing-reasons.service';

@Component({
  selector: 'app-closing-reason',
  templateUrl: './closing-reason.component.html',
  styleUrls: ['./closing-reason.component.css']
})
export class ClosingReasonComponent extends CoreComponent implements OnInit {

  public item: ClosingReason;

  constructor(public meta: Meta,
              public title: Title,
              public closingReasonsService: ClosingReasonsService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(closingReasonsService, toasterService, route, location);
    this.title.setTitle('Closing Reason Details');
  }


  public ngOnInit(): void {

    this.item = new Service();
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      }
    });

  }
}

