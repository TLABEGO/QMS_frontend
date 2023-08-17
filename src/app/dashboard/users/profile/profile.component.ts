import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {CoreComponent} from '../../../core/core.component';
import {User} from '../user/user';
import {UsersService} from '../users.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends CoreComponent implements OnInit {

  public item: User;

  constructor(public meta: Meta,
              public title: Title,
              public usersService: UsersService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(usersService, toasterService, route, location);
    this.title.setTitle('Profile');
  }


  public ngOnInit(): void {
    this.blockUI.start('Loading');
    this.item = new User();
    this.usersService.getProfile().subscribe((data: User) => {
      this.item = data;
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
    });

  }
}
