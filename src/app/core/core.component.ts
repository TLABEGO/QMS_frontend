import {Component, Input, OnInit} from '@angular/core';
import {CoreService} from './core.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {Results} from './results';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '@angular/common';
import {User} from '../dashboard/users/user/user';
import {Branch} from '../dashboard/branches/branch/branch';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html'
})
export class CoreComponent implements OnInit {

  @Input() public user: User;
  @Input() userId: string;
  @BlockUI() blockUI: NgBlockUI;
  public item: any;
  public keyword: string = '';
  public currentPage = 1;
  public perPage = 50;
  public branch: Branch;
  public totalItems: number = 10000000;
  public order = 'DESC';
  public type: string = 'Covid19';
  public orderBy = 'createDate';
  public results: any[] = new Array();
  public data: Results = new Results();


  constructor(public coreService: CoreService,
              public toasterService: ToasterService,
              public route: ActivatedRoute,
              public location: Location) {

  }

  public ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params.id !== undefined && (this.userId === null || this.userId === undefined || this.userId === '')) {
        if (params.id !== '0') {
          this.get(params.id);
        }
      } else {
        if (this.userId === null || this.userId === undefined || this.userId === '') {
          this.search();
        } else {
          this.searchByUser();
        }
      }
    });

  }

  sort(orderBy: string) {

    this.orderBy = orderBy;
    if (this.order === 'ASC') {
      this.order = 'DESC';
    } else {
      this.order = 'ASC';
    }

    if (this.userId === null || this.userId === undefined || this.userId === '') {
      this.search();
    } else {
      this.searchByUser();
    }

  }

  public search() {

    if (this.branch !== null && this.branch !== undefined) {
      this.blockUI.start('Loading');
      this.coreService.searchByBranch(this.currentPage, this.perPage, this.order, this.orderBy, this.keyword, this.branch.id)
        .subscribe((data: Results) => {
          this.blockUI.stop();
          this.data = data;
          this.results = data.content;
          this.totalItems = data.totalElements;
        }, (error: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toasterService.pop('error', 'Error', error.error.message);
        });
    } else if (this.user !== null && this.user !== undefined) {
      this.blockUI.start('Loading');
      this.coreService.searchByUser(this.currentPage, this.perPage, this.order, this.orderBy, this.keyword, this.user.id)
        .subscribe((data: Results) => {
          this.blockUI.stop();
          this.data = data;
          this.results = data.content;
          this.totalItems = data.totalElements;
        }, (error: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toasterService.pop('error', 'Error', error.error.message);
        });
    } else {
      this.blockUI.start('Loading');
      this.coreService.search(this.currentPage, this.perPage, this.order, this.orderBy, this.keyword)
        .subscribe((data: Results) => {
          this.blockUI.stop();
          this.data = data;
          this.results = data.content;
          this.totalItems = data.totalElements;
        }, (error: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toasterService.pop('error', 'Error', error.error.message);
        });
    }


  }

  public searchByType() {

    this.blockUI.start('Loading');
    this.coreService.searchByType(this.currentPage, this.perPage, this.order, this.orderBy, this.keyword, this.type)
      .subscribe((data: Results) => {
        this.blockUI.stop();
        this.data = data;
        this.results = data.content;
        this.totalItems = data.totalElements;
      }, (error: HttpErrorResponse) => {
        this.blockUI.stop();
        this.toasterService.pop('error', 'Error', error.error.message);
      });

  }

  public searchByUser() {

    this.blockUI.start('Loading');
    this.coreService.searchByUser(this.currentPage, this.perPage, this.order, this.orderBy, this.keyword, this.userId)
      .subscribe((data: Results) => {
        this.blockUI.stop();
        this.data = data;
        this.results = data.content;
        this.totalItems = data.totalElements;
      }, (error: HttpErrorResponse) => {
        this.blockUI.stop();
        this.toasterService.pop('error', 'Error', error.error.message);
      });

  }

  public getAll() {

    this.blockUI.start('Loading');
    this.coreService.getAll().subscribe((data: any[]) => {
      this.results = data;
      this.blockUI.stop();
    }, (error: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toasterService.pop('error', 'Error', error.error.message);
    });

  }

  public delete(id: string) {

    this.blockUI.start('Loading');
    this.coreService.delete(id).subscribe(data => {
      this.blockUI.stop();
    }, (error: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toasterService.pop('error', 'Error', error.error.message);
    });
  }

  public get(id: string) {

    this.blockUI.start('Loading');
    this.coreService.get(id).subscribe(data => {
      this.blockUI.stop();
      this.item = data;
    }, (error: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toasterService.pop('error', 'Error', error.error.message);
    });
  }

public backClicked() {
 this.location.back();

  }

  public onSubmit() {

    this.blockUI.start('Loading');
    this.coreService.save(this.item).subscribe(data => {
      this.toasterService.pop('success', 'Saved', 'Details saved successfully');
      this.item = data;
      this.blockUI.stop();
      this.location.back();
    }, (error: HttpErrorResponse) => {
      this.blockUI.stop();
      this.toasterService.pop('error', 'Error', error.error.message);
    });

  }


}
