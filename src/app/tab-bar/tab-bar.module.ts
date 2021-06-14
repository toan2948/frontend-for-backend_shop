import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabBarRoutingModule } from './tab-bar-routing.module';
import { TabBarViewComponent } from './tab-bar-view/tab-bar-view.component';
import {MatTabsModule} from "@angular/material/tabs";
import {NeuesProduktFormModule} from "../neues-produkt-form/neues-produkt-form.module";
import {BildHochladenModule} from "../bild-hochladen/bild-hochladen.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    TabBarViewComponent
  ],
  exports: [
    TabBarViewComponent
  ],
  imports: [
    CommonModule,
    TabBarRoutingModule,
    MatTabsModule,
    NeuesProduktFormModule,
    BildHochladenModule,
    MatIconModule
  ]
})
export class TabBarModule { }
