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

  fileContent: string | undefined;
  fileName: string | undefined;

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


  //upload Image

    //** youtube**

    uploadFile(event: any){
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      file: file
    });
    // @ts-ignore
    this.uploadForm.get('file').updateValueAndValidity();
  }


    //** Christopher 's way of uploading the image**

    // uploadFile(files: any){

    // if (files.length === 0)
    //   return;
    // var mimeType = files[0].type;
    // var reader = new FileReader();
    // let imagePath = files;
    // reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {
    //   // @ts-ignore
    //   this.fileContent = reader.result.toString();
    //  // @ts-ignore
    //   this.fileName = this.fileUploader.nativeElement.value.split(/(\\|\/)/g).pop()
    // }
 // }

  submitUploadData(){
    console.log(this.uploadForm.value);

    const formData: any = new FormData();
    // const owner = "/api/v2/admin/products/" + this.uploadForm.value.id;
    // formData.append('owner', owner);

    formData.append('owner', this.uploadForm.value.id);

    // @ts-ignore
    formData.append('file', this.uploadForm.get('file').value);
      this.imageService.uploadData(formData).subscribe(res => console.log(res));

    // const data =
    //   {
    //     "owner": "/api/v2/admin/products/" + this.uploadForm.value.id,
    //     "file": this.fileContent,
    //     "name": this.fileName,
    //     "path": "xoa"
    //   };
  // this.imageService.uploadData(data).subscribe(res => console.log(res));


  }

}
