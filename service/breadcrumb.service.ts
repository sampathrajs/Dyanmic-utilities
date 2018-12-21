import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class BreadcrumbService {
  private subject = new Subject<any>();
  
  breadCrumbs : any[];

  constructor() { 
    this.breadCrumbs  = [];
  }

  public currentBreadcrumbs() : Observable<any>{
    //this.subject =  <any> this.breadCrumbs;
    return this.subject.asObservable();
  }

  removeBreadcrumbs(index=0){
    index++;
    for(var i = this.breadCrumbs.length ;i > index; i--)
          this.breadCrumbs.pop();

   // disable link in current breadcrumb       
   this.breadCrumbs[this.breadCrumbs.length -1]['routeLink'] = false;

   this.subject.next( this.breadCrumbs);
  }  

  public addBreadCrumb(bcrumb:any){
    let crumbsLen   = this.breadCrumbs.length;
    bcrumb['index'] = crumbsLen;
    
    if(crumbsLen > 0){
      this.breadCrumbs[crumbsLen-1].routeLink =  true;
    }

    bcrumb['routeLink'] =  false;
    bcrumb['path']      = '/'+bcrumb['path'];

    this.breadCrumbs.push(bcrumb);
    this.subject.next( this.breadCrumbs);
  }



  public clearBreadCrumb(bcrumb:any){
    this.breadCrumbs = [];
    this.subject.next(this.breadCrumbs);
  }

  
  public resetBreadCrumb(bcrumb:any){
    this.breadCrumbs = [];
    this.subject.next(this.breadCrumbs);
  }

  
  public reconfigBreadCrumb(bcrumbs:any[]){
    this.breadCrumbs = bcrumbs;
    this.subject.next(this.breadCrumbs);
  }


}
