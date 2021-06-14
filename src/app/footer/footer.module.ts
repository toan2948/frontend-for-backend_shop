import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterRoutingModule } from './footer-routing.module';
import { FooterViewComponent } from './footer-view/footer-view.component';


@NgModule({
  declarations: [
    FooterViewComponent
  ],
  exports: [
    FooterViewComponent
  ],
  imports: [
    CommonModule,
    FooterRoutingModule
  ]
})
export class FooterModule { }
