import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BildHochladenRoutingModule } from './bild-hochladen-routing.module';
import { BildHochladenComponent } from './bild-hochladen/bild-hochladen.component';
import { MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BildHochladenComponent
  ],
  exports: [
    BildHochladenComponent
  ],
  imports: [
    CommonModule,
    BildHochladenRoutingModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class BildHochladenModule { }
