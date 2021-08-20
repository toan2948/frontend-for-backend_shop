import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    LeftSideBarComponent
  ],
  exports: [
    LeftSideBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class LeftSideBarModule { }
