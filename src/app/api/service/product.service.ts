import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import Product from "../../model/product";
import {C} from "@angular/cdk/keycodes";
import Image from "../../model/image";
import ChannelPricing from "../../model/channel-pricing";

@Injectable()
export class ProductService {
  // apiBaseUrl: 'http://127.0.0.1:8000',
  // apiBaseAdminUrl: 'http://127.0.0.1:8000/api/v2/admin/'
  urlProduct = environment.apiBaseUrl + '/api/v2/admin/products';
  urlImage =   environment.apiBaseUrl + '/api/v2/admin/product-images';
  urLChannel = environment.apiBaseUrl + '/api/v2/admin/channel-pricings/'

   httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    accept: 'application/json'
  });
  constructor( private http: HttpClient ) { }

  getProducts(): Observable<Product[]>{

    return this.http.get<Product[]>(this.urlProduct, {headers: this.httpHeaders});
    // <- the return type of the get method is important, in this case the return type is 'product'
    // return this.http.get(this.urlProduct);
  }

  getSingleProduct(code: string): Observable<Product> {
    return this.http.get<Product>(this.urlProduct + '/' + code, {headers: this.httpHeaders});
  }


  postProduct(body: any){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json'
    });
    return this.http.post<any>(this.urlProduct, body, {headers: httpHeaders});
    // return this.http.get(this.urlProduct);
  }

  // postFile(fileToUpload: File): number {
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return 1;
  // }
  getImages(): Observable<Image[]>{
    return this.http.get<Image[]>(this.urlImage, {headers: this.httpHeaders});
  }
  postImage(body: any){
    const httpHeaders = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // accept: 'application/json'
    });
    return this.http.post<any>(this.urlImage, body, {headers: httpHeaders});
  }

  getChannelPricing(id: number) : Observable<ChannelPricing> {
    return this.http.get<ChannelPricing>(this.urLChannel + id, {headers: this.httpHeaders})
  }
}
