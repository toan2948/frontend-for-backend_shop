import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftSideBarRoutingModule } from './left-side-bar-routing.module';
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
    LeftSideBarRoutingModule,
    MatIconModule
  ]
})
export class LeftSideBarModule { }
