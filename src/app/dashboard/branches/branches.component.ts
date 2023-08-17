import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {CoreComponent} from '../../core/core.component';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {BranchesService} from './branches.service';
import {UsersService} from '../users/users.service';
import {Branch} from './branch/branch';

declare var bootbox: any;

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent extends CoreComponent {

  public results: Array<Branch>;

  constructor(public meta: Meta,
              public title: Title,
              public branchesService: BranchesService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public usersService: UsersService,
              public route: ActivatedRoute,
              public location: Location) {
    super(branchesService, toasterService, route, location);
    this.title.setTitle('Customer Care Center');
  }

  remove(branch: Branch) {

    const that = this;
    bootbox.confirm({
      title: 'Delete ' + branch.name,
      message: 'Are you sure you want to delete ' + branch.name,
      callback: function(result) {
        if (result === null) {
        } else if (result === true) {
          that.branchesService.delete(branch.id).subscribe(data => {
            that.toasterService.pop('info', 'Delete a branch', 'branch successfully deleted :)');
            that.search();
          }, error => {
            that.toasterService.pop('error', 'Error', error.message);
          });
        }
      }
    });

  }

  update(branch: Branch) {
    this.branchesService.save(branch).subscribe(data => {
      //this.toasterService.pop('info', 'Branch turned ' + (branch.enabled === true ? 'on' : 'off'), 'branch successfully turned on :)');
    }, error => {
      this.toasterService.pop('error', 'Error', error.message);
    });
  }

}
