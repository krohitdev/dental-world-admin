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
export class DashboardService extends BaseService {

  baseUrl = environment.BaseURL;

  constructor(
    public http: HttpClient,
    public router: Router,
    public notificationService: NotificationsService,

  ) {
    super(environment.BaseURL+environment.AdminAPI.user,http,router,notificationService);
  }

  getQuiz(quiz?,date?){
    let url = `${this.baseUrl}${environment.AdminAPI.quizStat}/${quiz}`;
    /* if (sort) {
      httpParams = httpParams.set('sortField', sort.field);
      httpParams = httpParams.set('sort', sort.sort);
    }
    if (json) {
      httpParams = httpParams.set('search', json); */
    
    let dt = new Date(date || null);
    let currentDate = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
    let selectDate = {date: currentDate };
        
    return this.http.post(url,selectDate,{
    //   params:httpParams,
      // headers: this.token(),
      responseType: 'json'
    })
    .pipe(
      map(data => {return data}),
      catchError((error:any)=>  {return throwError(error)})
    )
  }
}
