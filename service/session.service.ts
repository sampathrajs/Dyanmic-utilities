import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-store';

/* To save user's information in session */
@Injectable()
export class SessionService {

  constructor( private session: SessionStorageService ) { }

  /* Save session data's from component/service */
  public setSession(data : object) : void {
    this.session.set( "userData" , data );
  }

  /* To retrieve saved session based on keys or non keys */
  public getSession(key? : string) : object {
    let datas = this.session.get("userData");
    return (datas && key) ? (datas[key] ? datas[key] : null) : datas;
  }

  /* To remove entire session after logout or session expire from server */
  public clearSession() : void {
    this.session.clear("all");
  }

}