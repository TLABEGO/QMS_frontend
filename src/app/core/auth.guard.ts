import {Inject, Injectable} from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {UsersService} from '../dashboard/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usersService.loggedIn(state);
  }
}
