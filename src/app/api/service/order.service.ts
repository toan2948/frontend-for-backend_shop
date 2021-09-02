import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import Order from "../../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  urlOrder = environment.apiBaseAdminUrl + 'orders'

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    accept: 'application/json'
  })

  constructor(private http : HttpClient) { }


  getOrder(): Observable<Order[]>{
      return this.http.get<Order[]>(this.urlOrder,{headers: this.httpHeader})
  }
}
