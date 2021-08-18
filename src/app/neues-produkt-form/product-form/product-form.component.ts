import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../service/token.service";
import {ProductService} from "../../service/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import Product from "../../Model/product";
import {TestBehaviorSubjectService} from "../../service/test-behavior-subject.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  products: Product[] = [];
  product_codes: string[] =[];

  productForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    preis: new FormControl(''),
    desc: new FormControl(''),
  });

  imageForm = new FormGroup({
    path: new FormControl(''),
    id: new FormControl('')
  });

  //productId of the newly created product, it will be transfered to the varianten Component
  productId: number | undefined;



  constructor(
    private tokenService: TokenService,
    private productService: ProductService,
    private http: HttpClient,
    private productTransferSubject: TestBehaviorSubjectService
  )
  { }

  urlProduct = environment.apiBaseUrl + '/api/v2/admin/products';


  ngOnInit(): void {
    this.runGetToken();
    this.getProductCodes();
    this.productTransferSubject.productIdSubject.subscribe(d => this.productId = d);

  }

  getProductCodes(){
    this.productService.getProducts().pipe(
      tap( res =>
        {
          // take the codes from products by map()
          this.product_codes = res.map(product => product.code)
        }
      )
    ).
      //** you need subscribe() when using pipe(), it plays the role of open the pipe
    subscribe(() =>  null
        // console.log(res)
    )
  }

  runGetToken(){
    // console.log(this.tokenService.getToken());
    this.tokenService.getToken()
      .subscribe(res => {
        console.log(res.token);
      })
  }

  runGetProducts(){
    this.productService.getProducts().subscribe(res => {
      console.log(res);
      this.products = res;
    });
  }

  runRemoveToken(){
    this.tokenService.removeToken();
    console.log(localStorage.getItem('jwt_token'))
  }

  postProduct() {
    console.log(this.productForm.value);
    const data =
      {
        "code": this.productForm.value.name,
        "mainTaxon": `/api/v2/admin/taxons/${this.productForm.value.category}`,
        "translations": {
          "en_US": {
            "name": this.productForm.value.desc,
            "slug": this.productForm.value.desc,
            "locale": "en_US"
          }
          // *** 'name' and 'slug' are stored in the table 'sylius_product_translation'
        },
        // "images": [
        //   "/api/v2/admin/product-images/2"
        // ]
      };

     // const body = JSON.stringify(data);
    this.productService.postProduct(data).pipe(
      tap (res => {
        console.log(res);
        this.runGetSingleProduct(this.productForm.value.name);
          this.productTransferSubject.sendProductId(this.productId);
        }
      )
    ).subscribe(() => null);

  }

  runGetSingleProduct(code: string){
    this.productService.getSingleProduct(code).subscribe(
      res => {
        console.log('new product', res);
        this.productId = res.id;
        console.log(this.productId);
      }
    );
    this.productTransferSubject.sendProductId(this.productId);
  }
  runGetImages(){
      this.productService.getImages().subscribe(res => console.log(res))
  }
  //runPostImage() is not used
  runPostImage(){
    console.log(this.imageForm.value);
    const data =
      {
        "path": this.imageForm.value.path,
        "owner": "/api/v2/admin/products/" + this.imageForm.value.id
      };
    this.productService.postImage(data).subscribe( res => console.log(res));
  }

}

