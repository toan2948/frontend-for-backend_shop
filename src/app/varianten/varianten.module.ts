import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariantenRoutingModule } from './varianten-routing.module';
import { VariantenComponent } from './varianten/varianten.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    declarations: [
        VariantenComponent
    ],
    exports: [
        VariantenComponent
    ],
    imports: [
        CommonModule,
        VariantenRoutingModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule,
      MatCheckboxModule,
      MatRadioModule,
      MatCheckboxModule,
      MatChipsModule,
      MatFormFieldModule,
      MatIconModule,
      MatSelectModule,
      MatAutocompleteModule,
      MatInputModule
    ]
})
export class VariantenModule { }
