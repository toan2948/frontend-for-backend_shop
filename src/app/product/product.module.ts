import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BildHochladenModule} from "./bild-hochladen/bild-hochladen.module";
import {FooterModule} from "./footer/footer.module";
import {ProductComponent } from './product/product.component';
import {NeuesProduktFormModule} from "./neues-produkt-form/neues-produkt-form.module";
import {VariantenModule} from "./varianten/varianten.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    NeuesProduktFormModule,
    BildHochladenModule,
    VariantenModule,
    MatTabsModule,
    MatIconModule,
    FooterModule
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }
