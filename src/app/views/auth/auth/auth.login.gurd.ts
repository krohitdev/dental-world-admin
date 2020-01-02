import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, throwError } from "rxjs";
// import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // debugger

    const token = localStorage.getItem("token");

    if (token) {
      // const {type} = jwt_decode(token);
      const tokenStr = JSON.parse(token);
      const authToken = tokenStr.authToken;
      if (authToken) {
        this.router.navigate(["/dashboard"]);
        return true;
      } else {
        this.router.navigate(["/admin/login"]);
      }
    } else {
      this.router.navigate(["/admin/login"]);
    }
  }
}
