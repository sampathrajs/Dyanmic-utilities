import { Injectable } from '@angular/core';
import { Routes, Router} from '@angular/router';
import { HttpService } from './http.service';
import { appComponentsList } from '../../components';
import { DynRoutes } from '../model/dyn.routes';

@Injectable()
export class DynamicroutesService {
  
  constructor(private router: Router, private http: HttpService) { }

  /* Function to configure New routes from backend server json */
  public configAngularRoutes(){
    let url = "/api/angular_routes";
    this.http.get<DynRoutes>(url).subscribe(data =>{ 
      if(data) {
        //console.log(" coming.." +data);
        let builtRoutes = this.buildRoutes(data);
        let routesArr   = <Routes>[];
        routesArr       = <any>builtRoutes;
        routesArr.forEach( newroute => {
          this.router.config.push( newroute );
        });
        this.router.resetConfig( this.router.config );
      }
    });
  }


  /*
    Function to change component name into component 
    recursive, if child routes found
  */
  public buildRoutes(routesArr : any){
    var currentRoutes = [];
    routesArr.forEach( newroute => {
      newroute.component = appComponentsList[newroute.component.toString()];

      if(newroute.children != undefined){
        newroute.children  = this.buildRoutes(newroute.children)
      }
      currentRoutes.push(newroute);
    });

    return currentRoutes;
  }



}
