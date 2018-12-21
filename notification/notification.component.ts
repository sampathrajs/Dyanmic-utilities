import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { Subscription } from 'rxjs';

declare var notify: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  private subscription: Subscription;

  constructor(private notification: NotificationService) { }

  ngOnInit() {  
    this.subscription = this.notification.response$.subscribe(data => data ? this.popup(data) : "");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  popup(response: any){
    let type = ( response.type === false ) ? "danger" : "success";
    new notify("top", "right", "glyphicon glyphicon-plus", type, 500, 500,"bootstrap Title ", response.message);
  }
}
