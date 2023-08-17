import {Component, OnInit} from '@angular/core';
import {BranchesService} from '../../branches/branches.service';
import {Login} from '../../../login/login';
import {UsersService} from '../../users/users.service';
import {CookieService} from 'ngx-cookie-service';
import {Title} from '@angular/platform-browser';
import {Results} from '../../../core/results';
import {Branch} from '../../branches/branch/branch';

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.css']
})
export class SelectBranchComponent implements OnInit {

  public branches: Array<Branch>;

  constructor(private  branchesService: BranchesService,
              private usersService: UsersService,
              private cookieService: CookieService,
              private title: Title) {
  }

  ngOnInit() {

    this.branchesService.search(1, 1000, 'ASC', 'name', '').subscribe((results: Results) => {
      this.branches = results.content;
    });
    this.usersService.logout().subscribe((data: Login) => {
    });
    this.cookieService.deleteAll();
    this.cookieService.delete('X_TOKEN');
    this.title.setTitle('Select Branch');
  }

}
