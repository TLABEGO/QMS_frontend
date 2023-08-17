import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {Meta, Title} from '@angular/platform-browser';
import {EntriesService} from '../../entries/entries.service';
import {UsersService} from '../../users/users.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../core/config.service';
import {Location} from '@angular/common';
import {Message} from './message';
import {MessagesService} from '../messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent extends CoreComponent implements OnInit {

  public item: Message;

  constructor(public meta: Meta,
              public title: Title,
              public messagesService: MessagesService,
              public usersService: UsersService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public configService: ConfigService,
              public location: Location) {
    super(messagesService, toasterService, route, location);
    this.title.setTitle('Message');
  }

}
