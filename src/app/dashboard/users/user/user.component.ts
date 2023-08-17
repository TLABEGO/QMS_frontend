import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {CoreComponent} from '../../../core/core.component';
import {User} from './user';
import {UsersService} from '../users.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends CoreComponent implements OnInit {

  public item: User;
  public admin: User;

  constructor(public meta: Meta,
              public title: Title,
              public usersService: UsersService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(usersService, toasterService, route, location);
    this.title.setTitle('User Details');
  }

  public setRole(role: string) {
    this.item.role = role;
    if (this.usersService.hasPermission('PERM_BRANCHADMIN')) {
      this.item.branch = this.admin.branch;
    }
   }

  public branchChange() {
    this.item.teller = null;
  }

  public ngOnInit(): void {

    this.item = new User();
    this.usersService.getProfile().subscribe((user: User) => {
        this.admin = user;
    });
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      }
    });

  }
}
