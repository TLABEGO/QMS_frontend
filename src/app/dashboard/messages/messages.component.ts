import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {ConfigService} from '../../core/config.service';
import {ToasterService} from 'angular2-toaster';
import {UsersService} from '../users/users.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MessagesService} from './messages.service';
import {Message} from './message/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent extends CoreComponent {
  public results: Array<Message>;
  constructor(public meta: Meta,
              public title: Title,
              public messagesService: MessagesService,
              public configService: ConfigService,
              public toasterService: ToasterService,
              public usersService: UsersService,
              public route: ActivatedRoute,
              public location: Location) {
    super(messagesService, toasterService, route, location);
    this.title.setTitle('Messages');
  }


}
