import { Component, OnInit } from '@angular/core';
import Product from "../../model/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // @ts-ignore
  receivedProduct: Product;

  receiveProduct(product: Product){
    this.receivedProduct = product;
    console.log('the received product is ', this.receivedProduct)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
