import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {TokenService} from "../../service/token.service";
import {ProductService} from "../../service/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import Product from "../../Model/product";
import Taxon from "../../Model/taxon";
import {OptionService} from "../../service/option.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  products: Product[] = [];
  product_codes: string[] =[];
  taxons: string[]= []; // t_shirts, jeans, dresses, caps

  productForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    desc: new FormControl(''),
  });

  imageForm = new FormGroup({
    path: new FormControl(''),
    id: new FormControl('')
  });

  //the newly created product, it will be transfered to the varianten Component
  createdProduct: Product | undefined;



  constructor(
    private tokenService: TokenService,
    private productService: ProductService,
    private http: HttpClient,
    private optionService: OptionService
  )
  { }


  ngOnInit(): void {
    this.runGetToken();
    this.getProductCodes();
    this.runGetTaxons();

  }
  @Output() productCreatedEvent = new EventEmitter<Product>();

  sendCreatedProduct(createdProduct: Product){
      this.productCreatedEvent.emit(createdProduct);
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
        }
      )
    ).subscribe(() => null);

  }

  runGetSingleProduct(code: string){
    this.productService.getSingleProduct(code).subscribe(
      res => {
        console.log('new product', res);
        this.createdProduct = res;
        console.log(this.createdProduct);
        this.sendCreatedProduct(this.createdProduct)
      }
    );
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
  runGetTaxons(){
    let taxonArray: Taxon[];
    this.optionService.getTaxons().pipe(
      tap( res => {
        taxonArray = res.map((element) => element);
        this.taxons = taxonArray.map(element => element.code.replace('/api/v2/admin/taxons/', ''));
      })
    )
      .subscribe(res => {
        console.log('taxon', this.taxons)
      });
  }

}

