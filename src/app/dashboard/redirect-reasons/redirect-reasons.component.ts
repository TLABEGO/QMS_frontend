import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-redirect-reasons',
  templateUrl: './redirect-reasons.component.html',
  styleUrls: ['./redirect-reasons.component.css']
})
export class RedirectReasonsComponent implements OnInit {

  constructor(public title: Title) {
    this.title.setTitle('Redirect Reasons');
  }
  ngOnInit() {
  }

}
