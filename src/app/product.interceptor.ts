import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpEventType, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, map, switchMap, take, tap} from "rxjs/operators";
import {TokenService} from "./service/token.service";
import {environment} from "../environments/environment";

@Injectable()
export class ProductInterceptor implements HttpInterceptor {
  token: string | undefined;
  getTokenURL = environment.apiBaseUrl + '/api/v2/admin/authentication-token';
  res: Object | undefined;
  constructor(private tokenService: TokenService) {}


  // @ts-ignore
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url !== this.getTokenURL) {
      console.log(request);
      const newRequest = this.addToken(request, localStorage.getItem('jwt_token') );

      return next.handle(newRequest).pipe(
        tap((event: HttpEvent<any>) => {
            if( event instanceof HttpResponse){
                console.log('sucess');
            }
        }
        ),
        // @ts-ignore
        catchError((error): Observable<any> => {
            if(error instanceof HttpErrorResponse &&error.status === 401){
                 console.log("token expired or not loggined");
                 return this.handle401Error(request, next);
            }
            else {
              return throwError(error);
            }
          }
        )
      );
    }

    return next.handle(request);
  }
  // private handleHttpResponseError(request : HttpRequest<any>, next : HttpHandler) {
  //   // @ts-ignore
  //   this.tokenSubject.next(null);
  //   this.tokenService.getToken()
  //     .subscribe(res => {
  //       console.log(res.token);
  //       localStorage.setItem('jwt_token', res.token);
  //       this.tokenSubject.next(res.token);
  //     })
  //   const newRequest = request.clone({
  //     headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwt_token'))
  //   });
  //   return next.handle(newRequest);
  // }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.tokenService.getToken().pipe(
        switchMap((res: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(res.token);
          return next.handle(this.addToken(request, res.token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }


  private addToken(request: HttpRequest<any>, token: string | null){
    const newRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
    return newRequest;

  }
}
    // if (this.token && request.url === 'http://127.0.0.1:8000/api/v2/admin/products'  && request.method ==="GET") {
    //   console.log(request);
    //   const newRequest = request.clone({
    //     headers: request.headers.set('Authorization', 'Bearer ' + this.token)
    //   });
    //   return next.handle(newRequest);
    // }
    // else if(this.token && request.url === 'http://127.0.0.1:8000/api/v2/admin/products' && request.method ==="POST") {
    //   console.log(request);
    //   const newRequest = request.clone({
    //     headers: request.headers.set('Authorization', 'Bearer ' + this.token)
    //   });
    //   return next.handle(newRequest);
    // }


    // if (request.url !== this.getTokenURL) {
    //     console.log(request);
    //     const newRequest = request.clone({
    //       headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwt_token'))
    //     });
    //     return next.handle(newRequest);
    // }
    // //
    // else if (request.url === this.getTokenURL)
    //   {
    //     console.log(request);
    //     // display the response
    //     return next.handle(request).pipe(
    //       map((event: HttpEvent<any>) => {
    //         if (event instanceof HttpResponse) {
    //           console.log(event);
    //           this.token = event.body.token;
    //           localStorage.setItem('jwt_token', event.body.token);
    //         }
    //         return event; // without this command, subscribe of runGetToken() will not function
    //       }));
    //   }




