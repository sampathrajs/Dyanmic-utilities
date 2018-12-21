import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Notify } from '../model/notify';
import { CookiesStorageService } from 'ngx-store';
import { HttpNotify } from '../model/httpnotify'

const serverURL = environment.baseURL;

@Injectable()
export class HttpService {

  private notifyObj: Notify;

  constructor(
      private http: HttpClient,
      public notifyService: NotificationService,
      private cookieService: CookiesStorageService
    ) { }
  
  /* GET request to server. */
  public get<T>(URL: string, params?: any, notify?: HttpNotify | null): Observable<T> {
    return this.http.get<T>(
      serverURL+URL,
      { 
        headers : this.generateHeaders(),
        withCredentials: true,
        params: params 
      }
    ).pipe(
      tap(datas => notify ? this.showNotify(notify,datas) : ""),
      map((datas : T) => this.validateResponse(<T>datas)),
      catchError(this.httpError<any>("Get Request",notify))
    );
  }

  /* POST request to server. */
  public post<T>(URL: string, params?: any, notify?: HttpNotify | null): Observable<T> {
    return this.http.post<T>(
      serverURL+URL,
      params,
      { 
        headers : this.generateHeaders(), 
        withCredentials: true
      }
    ).pipe(
      tap(datas => this.showNotify(notify,datas)),
      map((datas : T) => this.validateResponse(<T>datas)),
      catchError(this.httpError<any>("Post Request",notify))
    );
  }

  /* PUT request for update datas from server. */
  public update<T>(URL: string, params: any, notify?: HttpNotify | null): Observable<T> {
    return this.http.put<T>(
      serverURL+URL,
      params,
      { headers : this.generateHeaders(), withCredentials: true, }
    ).pipe(
      tap(datas => notify ? this.showNotify(notify,datas) : ""),
      map((datas : T) => this.validateResponse(<T>datas)),
      catchError(this.httpError<any>("Update Request",notify))
    );
  }

  /* DELETE request to remove datas from server */
  public delete<T>(URL: string, params: any, notify?: HttpNotify | null): Observable<T> {
    return this.http.delete<T>(
      serverURL+URL,
      { 
        headers : this.generateHeaders(),
        withCredentials: true,
        params: params 
      }
    ).pipe(
      tap(datas => notify ? this.showNotify(notify,datas) : ""),
      map((datas : T) => this.validateResponse(<T>datas)),
      catchError(this.httpError<any>("Delete Request",notify))
    );
  }

  /* Capture server/request error */
  private httpError<T> (operation = '', notify: HttpNotify | null, result?: T): any {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      this.showNotify(notify,error);
      return of(result as T);
    };
  }

  /* To send headers with all requests*/
  private generateHeaders(): any {
    
    let headerOptions = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Access-Control-Allow-Credentials" : 'true'
    };

    if(this.cookieService.get('X-Kudi-Token'))
      headerOptions['X-Kudi-AppKey'] = '0dcc9323a17af516f318fd2dbc05456f725071bf';
    
    return new HttpHeaders(headerOptions);
  }

  /* To avoid proceeding further for error messsage in component*/
  private validateResponse(data : any) : any {
    return data.message == "Success" ? data : null;
  }

  /* Show server notification to users */
  private showNotify(notify: HttpNotify | null, data: any): void {
    this.notifyObj = data;
    let type = (this.notifyObj.status == 200 || this.notifyObj.message=="Success") ? true: false;
    
    //Show Notification based on user's input
    if((notify && notify.all) || (notify && notify.error && !type) || (notify && notify.success && type) || type == false )
      this.notifyService.Response = { type : type,  message : this.notifyObj.message };
  }
}
