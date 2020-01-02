import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../auth.service";
import { Observable, throwError } from "rxjs";
// import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // old code
    // const currentUser = this.service.currentUserValue;
    // if (currentUser) {
    //   // logged in so return true
    //   return true;
    // }

    // // not logged in so redirect to login page with the return url
    // this.router.navigate(['/admin/login'],
    // // { queryParams: { returnUrl: state.url } }
    // );
    // return false;
    // old code

    /* const token = localStorage.getItem('token');

    if (token) {
      // const {type} = jwt_decode(token);
      const tokenStr = JSON.parse(token);
      const authToken = tokenStr.authToken;
    
      if (authToken) {
        this.router.navigate(['/dashboard']);
        return true;
      } else {
        this.router.navigate(['/admin/login']);
      }
    } else {
      this.router.navigate(['/admin/login']);
    } */

    if (this.service.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/admin/login"]);
      return false;
    }
  }
}
