import { Component, OnInit } from '@angular/core';
import Product from "../../Model/product";

@Component({
  selector: 'app-tab-bar-view',
  templateUrl: './tab-bar-view.component.html',
  styleUrls: ['./tab-bar-view.component.css']
})
export class TabBarViewComponent implements OnInit {

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
