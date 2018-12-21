import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/* To capture message/error from server and send it to component  */
@Injectable()
export class NotificationService {

  private response = new BehaviorSubject<any>(null);
  response$ = this.response.asObservable();

  public set Response(value: any) {
    this.response.next(value);
  }

  public get Response():any {
    return this.response.getValue()
  }
}
