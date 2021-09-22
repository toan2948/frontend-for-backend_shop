import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../api/service/order.service";
import Orders from "../../model/orders";
import {subscribeOn, tap} from "rxjs/operators";
import {OptionService} from "../../api/service/option.service";
import Variant from "../../model/variant";
import {Observable} from "rxjs";
import {ProductService} from "../../api/service/product.service";
import {ImageService} from "../../api/service/image.service";
import Product from "../../model/product";
import {environment} from "../../../environments/environment";
import ChannelPricing from "../../model/channel-pricing";
import Image from "../../model/image";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  //extract the tokenValue from the route
  //  tokenValue: string | null = this.route.snapshot.paramMap.get('tokenValue')
  tokenValue: string | null
    // @ts-ignore
    | undefined


  // @ts-ignore
  order: Order

  //variants of the order
  variants: Variant[] = []

  //ex: 911M_regular_fit_jeans
  productCodes: string[] = []

  //ex: variant: "/api/v2/admin/product-variants/911M_regular_fit_jeans-variant-0" => code = 911M_regular_fit_jeans-variant-0
  variantCodes: string[] = []

  products: Product[] =[]

  //image path: ex: /99/4a/16fd7b6df59646c37201e7a4a760.jpg

  images: Image[] = []


  imgTest = environment.apiBaseUrl +"/media/image/96/1b/cfa4bf2f5123b8c17c6c1b18f5f3.jpg"

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private optionService: OptionService,
    private productService: ProductService,
    private imageService: ImageService
  ) { }


  ngOnInit(): void {
    // if do not subscribe to route.paramMAp
    //ngOnInit runs only one time if the route goes from this order to another order
    // http://localhost:4200/order/sZx1kHN3S8 -> http://localhost:4200/order/wQ8ZbLgHzf
    this.route.paramMap.subscribe((params) =>
    {
      this.tokenValue = params.get('tokenValue')
      console.log("user id is", this.tokenValue )
      this.runGetSingleOrder(this.tokenValue)
    })
  }

  runGetSingleOrder(tokenValue: string | null) {
    //order -> [variantCodes, productCodes] -> [Variants, Products (Images)]; Variants -> VariantPrices
    this.orderService.getSingleOrder(tokenValue).pipe(
      tap(
        res => {

          //copy the res to the order
          this.order = JSON.parse(JSON.stringify(res))
          console.log('order', this.order)

          //get codes of variants (variantCodes)
          this.variantCodes = res.items.map(element =>
            element.variant.substr(31)
          )

          //get product codes and push to the array 'productCodes'
          res.items.forEach(e => this.getProductCode(e.productName))

          //get Product and Images of items
          this.productCodes.forEach(e => {
                  this.productService.getSingleProduct(e)
                  .subscribe(
                    (res) => {
                      //get products
                      this.productService.getSingleProduct(e).subscribe(
                        res => this.products.push(res)
                      )
                      //get images
                      this.imageService.getAnImage(res.images[0].id).subscribe(
                        res =>    this.images.push(res)
                      )
                    }
                  )
          })
        }
      )
    )
    .subscribe(
      () => {
        this.variantCodes.forEach(element => {
          //get variants from variantCodes
          this.optionService.getSingleVariant(element).pipe(
            tap(
              (res) => {
                  this.variants.push(res);
              }
            )
          )
            .subscribe()
        })
        })
  }

  runGetSingleVariant(code: string) {
    this.optionService.getSingleVariant(code).subscribe(
        (res: Variant) => {
        console.log('variant', res)
        this.variants.push(res)
      }
    )
  }


  //get the code of the product from the product name
  getProductCode(productName: string) {
    // remove all spaces around the name
    let productCode: string = ''
    // @ts-ignore
    productCode = (productName.trim().replaceAll(' ', '_')).replace('-', '_')
    this.productCodes.push(productCode)
  }

}
