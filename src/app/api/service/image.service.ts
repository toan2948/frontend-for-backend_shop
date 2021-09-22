import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import Image from "../../model/image";

@Injectable()
export class ImageService {
  //in the new version of Sylius (1.10),  urlImage = .... /api/v2/admin/product-images
  urlImage =   environment.apiBaseUrl + '/api/v2/admin/product-images';
   httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    accept: 'application/json'
  });

  constructor( private http: HttpClient ) { }

  postImage(body: any){

    return this.http.post<any>(this.urlImage, body, {headers: this.httpHeaders});
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

  getAnImage(id: number): Observable<Image>{
    return this.http.get<Image> (this.urlImage + '/'  + id, {headers: this.httpHeaders} )
  }

}
