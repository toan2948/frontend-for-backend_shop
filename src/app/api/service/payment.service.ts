import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import Payment from "../../model/payment";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  urlPayment = environment.apiBaseAdminUrl + 'payments/'
  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    accept: 'application/json'
  })

  constructor(private http: HttpClient) { }

  getPayment(id: number){
    return this.http.get<Payment>( this.urlPayment + id, {headers: this.httpHeader})
  }
}
