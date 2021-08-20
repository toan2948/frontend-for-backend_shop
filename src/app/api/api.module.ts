import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageService} from "./service/image.service";
import {ProductService} from "./service/product.service";
import {OptionService} from "./service/option.service";
import {TokenService} from "./service/token.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ImageService,
    ProductService,
    OptionService,
    TokenService
  ]
})
export class ApiModule { }
