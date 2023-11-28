import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
// @ts-ignore
import Promise from "$GLOBAL$";
import {NavController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
      private navigation: NavController
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let token = localStorage.getItem("ads_access_token");

    if(!token){
      this.navigation.navigateRoot(['login']);
      return false;
    }else{
      return true;
    }
  }
}
