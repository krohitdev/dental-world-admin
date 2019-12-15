import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationsService } from '../../shared/notifications.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  baseUrl = environment.BaseURL;

  constructor(
    public http: HttpClient,
    public router: Router,
    public notificationService: NotificationsService,

  ) {
    super(environment.BaseURL+environment.AdminAPI.user,http,router,notificationService);
  }

  getList(json?: string, page?, sort?,category?): Observable<any> {
    let url;
    switch (category){
      case "1": {
        url = environment.AdminAPI.user;
        break;
      }
      case "2": {
        url = environment.AdminAPI.winner;
        //this.getWinners();
        break;
      }
      case "3": {
        // this.getOneUser();
        return;
        break;
      }
      case "4": {
        // this.transferAccount();
        url = environment.AdminAPI.bankDetails;
        break;
      }
    } 
    const queryStrings = { size: environment.ItemperPage, page };
    let httpParams = new HttpParams().set('size', environment.ItemperPage)
      .set('page', page);
    /* if (sort) {
      httpParams = httpParams.set('sortField', sort.field);
      httpParams = httpParams.set('sort', sort.sort);
    }*/
    if (json) {
      httpParams = httpParams.set('search', json);
    }

    return this.http.get(this.baseUrl + url,{
      params:httpParams,
      // headers: this.token(),
      responseType: 'json'
    })
    .pipe(
      map(data => {return data}),
      catchError((error:any)=>  {return throwError(error)})
    )
  }

  updateUserStatus(payload): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + environment.AdminAPI.userStatus,payload ,{
        // headers: this.token(),
        responseType: 'json'
      })
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
    ); 
  }

  /*** GET One record from the server **/
  getOne(id?: string): Observable<any> {
    return this.http
      .get<any>(id ? `${this.baseUrl}${environment.AdminAPI.oneUser}/${id}`:`${this.baseUrl}${environment.AdminAPI.user}`, {
        // headers: this.token(),
        responseType: 'json'
      })
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  userCSV():Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}${environment.AdminAPI.oneUser}`, {
        // headers: this.token(),
        responseType: 'json'
      })
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }


  
  search(payload): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + environment.AdminAPI.search,payload ,{
        // headers: this.token(),
        responseType: 'json'
      })
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
    ); 
  }

}
