import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import Orders from "../../model/orders";
import Order from "../../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  urlOrders = environment.apiBaseAdminUrl + 'orders'


  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
     accept: 'application/json'
  })

  constructor(private http : HttpClient) { }

  getOrders(): Observable<Orders[]>{
      return this.http.get<Orders[]>(this.urlOrders,{headers: this.httpHeader})
  }

  getSingleOrder(tokenValue: string | null): Observable<Order> {
    return this.http.get<Order>(this.urlOrders + '/'+ tokenValue, {headers: this.httpHeader})
  }


}
