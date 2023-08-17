import {Component, OnInit} from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';
import {BranchesService} from '../branches.service';
import {Branch} from './branch';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent extends CoreComponent implements OnInit {

  public item: Branch;

  constructor(public meta: Meta,
              public title: Title,
              public branchesService: BranchesService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(branchesService, toasterService, route, location);
    this.title.setTitle('Customer Care Center Details');
  }


  public ngOnInit(): void {

    this.item = new Branch();
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      }
    });

  }
}
