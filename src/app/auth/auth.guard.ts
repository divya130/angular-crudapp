import { Injectable } from '@angular/core';
import { CanActivate,  Router, CanLoad, UrlSegment } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  
  constructor(private router : Router){

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean{

    if (localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != undefined && localStorage.getItem('userToken') != '')
    return true;
    this.router.navigate(['login']);
    return false;
  }

}
