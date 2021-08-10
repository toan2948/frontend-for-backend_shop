import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import Option from "../Model/option";

@Injectable({
  providedIn: 'root'
})
export class OptionService {
   httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    accept: 'application/json'
  });
  urlProductOption = environment.apiBaseAdminUrl + 'product-options';
  urlProductOptionCodeValue = '';
  urlProductVariant = environment.apiBaseAdminUrl + 'product-variants';


  constructor(private http: HttpClient) { }

  getUrlProductOptionCodeValue(codeforUrl: string){
    this.urlProductOptionCodeValue =  environment.apiBaseAdminUrl + 'product-options/'+ codeforUrl +'/values';
    return this.urlProductOptionCodeValue;
  }

  getProductOptions(): Observable<Option[]> {

    return this.http.get<Option[]>(this.urlProductOption, {headers: this.httpHeaders});
  }

  getProductOptionValues(codeForUrl: string): Observable<any> {
    this.getUrlProductOptionCodeValue(codeForUrl);
    return this.http.get<any>(this.urlProductOptionCodeValue, {headers: this.httpHeaders});
  }

  getProductVariants(){
    return this.http.get(this.urlProductVariant, {headers: this.httpHeaders});
  }


}
