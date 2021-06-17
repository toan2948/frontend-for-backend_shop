import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import Image from "../Model/image";

@Injectable({
  providedIn: 'root'
})
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

  postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json'
    });
    return this.http.post<any>(this.urlImage, formData, { headers: httpHeaders })

  }

  uploadData(x: FormData): Observable<any>{
    // const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   accept: '*/*',
    // });
    // return this.http.post(this.urlImage,x, {headers: httpHeaders})
    return this.http.post(this.urlImage,x);
  }

}
