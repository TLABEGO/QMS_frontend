import {Component, OnInit} from '@angular/core';
import {BranchesService} from '../../dashboard/branches/branches.service';
import {UsersService} from '../../dashboard/users/users.service';
import {CookieService} from 'ngx-cookie-service';
import {Title} from '@angular/platform-browser';
import {Results} from '../../core/results';
import {Login} from '../../login/login';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ReportForm} from '../../dashboard/report/report.form';
import {TicketsService} from '../../dashboard/tickets/tickets.service';
import {BranchCount} from '../../dashboard/report/statuscount';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {Branch} from '../../dashboard/branches/branch/branch';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

declare var moment: any;

@Component({
  selector: 'app-mobile-landing',
  templateUrl: './mobile-landing.component.html',
  styleUrls: ['./mobile-landing.component.css']
})
export class MobileLandingComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public dt: Date = new Date();
  public branches: Array<Branch>;
  public name = '';
  public contactNumber = '';
  public email = '';
  public idNumber = '';

  public branchCount: Array<BranchCount>;
  public reportForm: ReportForm = new ReportForm();
  public date: NgbDateStruct = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());


  constructor(private branchesService: BranchesService,
              private usersService: UsersService,
              private cookieService: CookieService,
              public ticketsService: TicketsService,
              private title: Title,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    const that = this;
    this.route.queryParams.subscribe(params => {
      that.name = params['name'] ? params['name'] : '';
      that.contactNumber = params['contactNumber'] ? params['contactNumber'] : '';
      that.email = params['email'] ? params['email'] : '';
      that.idNumber = params['idNumber'] ? params['idNumber'] : '';
    });


    this.usersService.logout().subscribe((data: Login) => {
    });
    this.reportForm.start = moment({
      year: this.date.year,
      month: this.date.month - 1,
      date: this.date.day
    }).format('DD MMMM YYYY');
    this.reportForm.end = moment({
      year: this.date.year,
      month: this.date.month - 1,
      date: this.date.day
    }).format('DD MMMM YYYY');
    this.reportForm.status = 'WAITING';
    this.blockUI.start('Loading');
    this.ticketsService.branchCount(this.reportForm).subscribe((data: Array<BranchCount>) => {
      this.branchCount = data;
      this.branchesService.searchOnlinebooking(1, 1000, 'ASC', 'name', '').subscribe((results: Results) => {
        this.branches = results.content;
        this.blockUI.stop();
      });
    });
    this.cookieService.deleteAll();
    this.cookieService.delete('X_TOKEN');
    this.title.setTitle('Select Branch');

  }


  getCount(branch: Branch): number {

    if (!this.branchCount) {
      return 0;
    }
    let count = 0;
    this.branchCount.forEach((bra: BranchCount) => {
      if (bra && bra.id) {
        if (branch.id === bra.id.id) {
          count = bra.count;
        }
      }
    });
    return count;

  }

}
