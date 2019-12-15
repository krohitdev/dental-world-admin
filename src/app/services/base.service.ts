import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationsService } from '../shared/notifications.service';
// import { HttpClient } from 'selenium-webdriver/http';
import { not } from '@angular/compiler/src/output/output_ast';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  url: string;
  router: Router;
  notifier: NotificationsService = null;
  AuthToken;
  type:string;

  constructor(apiUrl,public http: HttpClient, router, notifier) { 
    this.url = apiUrl;
    this.router = router;
    this.notifier = notifier;
    // this.AuthToken = token;
    // this.type = type;
  }

  /***
   * GET All record from the server
   **/

  get(json?: string, page?, sort?): Observable<any> {
    const queryStrings = { size: environment.ItemperPage, page };
    let httpParams = new HttpParams().set('size', environment.ItemperPage)
      .set('page', page);
      
    if (sort) {
      // httpParams = httpParams.set('sortField', sort.field);
      // httpParams = httpParams.set('sort', sort.sort);
    }
    if (json) {
      // httpParams = httpParams.set('search', json);
    }

    return this.http.get<any>(this.url, {
        params: httpParams,
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
      .get<any>(id ? `${this.url}${environment.AdminAPI}/${id}`:`${environment.BaseURL}${this.url}`, {
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
  /*** Post to the server **/
  post(payload): Observable<any> {
    return this.http
      .post<any>(this.url, payload, {
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

  /*** delete from the server **/
  delete(id): Observable<any> {
    return this.http
      .delete<any>(`${this.url}/${id}`, {
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
  
  /*** put on the server **/
  put(id, payload): Observable<any> {

    return this.http
      .put<any>(`${environment.BaseURL}${this.url}/${id}`, payload, {
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

  // handle error
  handleError(err) {
    let message;
    if (err.status === 401) {
      if (err.error.err) {
        this.notifier.notify('error', err.error.message);
      } else {
        if(this.type=='admin'){
          localStorage.removeItem('token');
          this.router.navigateByUrl('/admin/login');
        }
        
      }
    } else if (err.status === 500) {
      this.notifier.notify('error', 'Request failed');
      // this.spinner.hide();
      return throwError(err);
    } else if (err.status === 403) {
      message = err.error.body.error.description;
      // this.spinner.hide();
      this.notifier.notify('error', message);
      return throwError(err);
    } else if (err.status === 409) {
      message = err.error.body.error.description;
      // this.spinner.hide();
      this.notifier.notify('error', message);
      return throwError(err);
    }
   else if (err.status === 301) { 
    message = err.error.body.error.description;
    // this.spinner.hide();
    this.notifier.notify('warning', message);
    return throwError(err);
   }
   else if (err.status === 400) { 
    message = err.error.message;
    // this.spinner.hide();
    this.notifier.notify('warning', message);
    return throwError(err);
   }
   else if (err.error.body.error.code === '305') { 
    message = err.error.body.error.description;
    // this.spinner.hide();
    this.notifier.notify('warning', message);
    return throwError(err);
   }
    else {
      return throwError(err);
    }
  }
}
