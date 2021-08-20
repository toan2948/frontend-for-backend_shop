import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import Image from "../../model/image";

@Injectable()
export class ImageService {
  urlImage =   environment.apiBaseUrl + '/api/v2/admin/product-images';

  constructor( private http: HttpClient ) { }

  postImage(body: any){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json'
    });
    return this.http.post<any>(this.urlImage, body, {headers: httpHeaders});
  }


  // uploadData(data: { owner: string; file: string | undefined; name: string | undefined }): Observable<any>{
    // const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   accept: '*/*',
    // });
    // return this.http.post(this.urlImage,data, {headers: httpHeaders})
  uploadData(data: FormData): Observable<any>{

    return this.http.post(this.urlImage,data);
  }

}
