import { Injectable } from '@angular/core';
import {NavController} from "@ionic/angular";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorAuth implements HttpInterceptor {

  constructor(private navigation: NavController) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("ads_access_token");

    if (token != null) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(tap(() => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          localStorage.removeItem('ads_access_token');
          this.navigation.navigateRoot(['login']);
        }
      }
    }));
  }



}
