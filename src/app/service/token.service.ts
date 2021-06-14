import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import TokenResponse from "../Model/tokenResponse";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  urlToken = environment.apiBaseUrl + '/api/v2/admin/authentication-token';

  constructor(private http: HttpClient) { }


  getToken(): Observable<TokenResponse>{
    const body = JSON.stringify({email: 'api@example.com', password: 'vanlam2948'});
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json'
    });
    return this.http.post<TokenResponse>(this.urlToken, body, {headers: httpHeaders})
      .pipe(
        tap(res =>
          localStorage.setItem('jwt_token', res.token)
      ));
  }
  removeToken() {
    localStorage.removeItem('jwt_token');
  }
}
