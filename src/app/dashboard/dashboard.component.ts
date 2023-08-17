import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {User} from './users/user/user';
import {UsersService} from './users/users.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public date: Date;
  user: User;
  constructor(public usersService: UsersService,
              public meta: Meta,
              public title: Title) {
    this.date = new Date();
    this.title.setTitle('Overview & stats');
  }
  ngOnInit() {
    this.usersService.getProfile().subscribe((data: User) => {
      this.user = data;
    });
  }

  closeMenu() {
    $('#sidebar').removeClass('display');
  }

}
