import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeuesProduktFormRoutingModule } from './neues-produkt-form-routing.module';
import { ProductFormComponent } from './product-form/product-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    NeuesProduktFormRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductFormComponent
  ]
})
export class NeuesProduktFormModule { }
