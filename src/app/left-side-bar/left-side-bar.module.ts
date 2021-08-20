import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    LeftSideBarComponent
  ],
  exports: [
    LeftSideBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ]
})
export class LeftSideBarModule { }
