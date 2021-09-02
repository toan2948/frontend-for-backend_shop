import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import Customer from "../../model/customer";
import {C} from "@angular/cdk/keycodes";
import {environment} from "../../../environments/environment";

@Injectable()
export class CustomerService {

  urlCustomer = environment.apiBaseAdminUrl + 'customers/'

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    accept: 'application/json'
  })

  constructor(private http: HttpClient ) { }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.urlCustomer + id, {headers: this.httpHeader})
  }
}
