import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import Image from "../Model/image";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlProduct = environment.apiBaseUrl + '/api/v2/admin/products';
  urlImage =   environment.apiBaseUrl + '/api/v2/admin/product-images';


  constructor( private http: HttpClient ) { }

  getProduct(){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json'
    });
    return this.http.get<any>(this.urlProduct, {headers: httpHeaders});
    // return this.http.get(this.urlProduct);
  }

  postProduct(body: any){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json'
    });
    return this.http.post<any>(this.urlProduct, body, {headers: httpHeaders});
    // return this.http.get(this.urlProduct);
  }

  postFile(fileToUpload: File): number {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return 1;
  }
  getImage(){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json'
    });
    return this.http.get<any>(this.urlImage, {headers: httpHeaders});
  }
  postImage(body: any){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json'
    });
    return this.http.post<any>(this.urlImage, body, {headers: httpHeaders});
  }
}
