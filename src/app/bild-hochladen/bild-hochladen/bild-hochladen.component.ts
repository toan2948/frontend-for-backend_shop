import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {ImageService} from "../../service/image.service";
import {TokenService} from "../../service/token.service";
import {tap} from "rxjs/operators";
import Product from "../../Model/product";
import {ProductService} from "../../service/product.service";
import {environment} from "../../../environments/environment";
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";

@Component({
  selector: 'app-bild-hochladen',
  templateUrl: './bild-hochladen.component.html',
  styleUrls: ['./bild-hochladen.component.css']
})
export class BildHochladenComponent implements OnInit {
  urlImage =   environment.apiBaseUrl + '/api/v2/admin/product-images';

  product_codes: string[] =[];


  uploadForm = new FormGroup({
    id: new FormControl(''),
    file: new FormControl('')
  });

  constructor(private http: HttpClient, private imageService: ImageService,
              private tokenService: TokenService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.runGetToken();
    this.getProductCodes();
  }
  runGetToken(){
    // console.log(this.tokenService.getToken());
    this.tokenService.getToken()
      .subscribe(res => {
        console.log(res.token);
      })

  }

  getProductCodes(){
    this.productService.getProducts().pipe(
      tap( res =>
        {
          this.product_codes = res.map(product => product.code)
        }
      )
    ).
    subscribe(() =>  null
      // console.log(res)
    )
  }

  // runPostImage(){
  //   console.log(this.productImageForm.value);
  //   const data =
  //     {
  //       "path": this.productImageForm.value.path,
  //       "owner": "/api/v2/admin/products/" + this.productImageForm.value.id
  //     };
  //   this.imageService.postImage(data).subscribe( res => console.log(res));
  // }

  //upload Image
  uploadFile(event: any){
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
  this.uploadForm.patchValue({
    file: file
  });
  // @ts-ignore
    this.uploadForm.get('file').updateValueAndValidity();
 }

  submitUploadData(){
    console.log(this.uploadForm.value);

    const formData: any = new FormData();
    // @ts-ignore
    const owner = "/api/v2/admin/products/" + this.uploadForm.value.id;

    formData.append('owner', owner);
    // @ts-ignore
    formData.append('file', this.uploadForm.get('file').value);
  this.imageService.uploadData(formData).subscribe(res => console.log(res));
  }





}
