import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { NotificationsService } from "../../shared/notifications.service";
import { Router } from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { User } from "./login/User";

@Injectable({
  providedIn: "root"
})
export class AuthService extends BaseService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    public http: HttpClient,
    public router: Router,
    public notificationService: NotificationsService // public spinner: NgxSpinnerService,
  ) {
    super(
      environment.BaseURL + environment.AdminAPI.user,
      http,
      router,
      notificationService
    );

    this.currentUserSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem("token"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  @Purpose: login user
   *  @Param:   email , password, secure code
   *  @Return:  login token
   */
  login(payload): Observable<any> {
    return this.http
      .post<any>(environment.BaseURL + environment.AdminAPI.login, payload)
      .pipe(
        map(data => {
          /*const name = data.body.data.firstName;  */
          let token = {
            authToken: data.data.token,
            userId: data.data.user
          };

          localStorage.setItem("token", JSON.stringify(token));
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  sendToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/admin/login"]);
  }
}
