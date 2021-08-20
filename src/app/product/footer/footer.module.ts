import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ]
})
export class FooterModule { }
