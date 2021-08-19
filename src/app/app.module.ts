import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NeuesProduktFormModule} from "./neues-produkt-form/neues-produkt-form.module";
import {LeftSideBarModule} from "./left-side-bar/left-side-bar.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TopBarModule} from "./top-bar/top-bar.module";
import {TabBarModule} from "./tab-bar/tab-bar.module";
import {FooterModule} from "./footer/footer.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductInterceptor} from "./product.interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import {TestBehaviorSubjectService} from "./service/test-behavior-subject.service";
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NeuesProduktFormModule,
    LeftSideBarModule,
    BrowserAnimationsModule,
    TopBarModule,
    TabBarModule,
    FooterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProductInterceptor, multi: true },
    TestBehaviorSubjectService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
