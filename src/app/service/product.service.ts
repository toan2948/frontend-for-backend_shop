import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import Product from "../Model/product";

@Injectable()
export class ProductService {
  urlProduct = environment.apiBaseUrl + '/api/v2/admin/products';
  urlImage =   environment.apiBaseUrl + '/api/v2/admin/product-images';

  constructor( private http: HttpClient ) { }

   httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    accept: 'application/json'
  });

  getProducts(): Observable<Product[]>{

    return this.http.get<Product[]>(this.urlProduct, {headers: this.httpHeaders});
    // <- the return type of the get method is important, in this case the return type is 'product'
    // return this.http.get(this.urlProduct);
  }

  getSingleProduct(code: string) {
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
  getImages(){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json'
    });
    return this.http.get<any>(this.urlImage, {headers: httpHeaders});
  }
  postImage(body: any){
    const httpHeaders = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // accept: 'application/json'
    });
    return this.http.post<any>(this.urlImage, body, {headers: httpHeaders});
  }
}
