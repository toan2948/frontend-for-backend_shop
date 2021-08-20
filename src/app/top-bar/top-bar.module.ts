import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarViewComponent } from './top-bar-view/top-bar-view.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    TopBarViewComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
  TopBarViewComponent
  ]
})
export class TopBarModule { }
